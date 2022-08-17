import {Component, OnInit} from '@angular/core';
import {Orders} from '../../dto/Orders';
import {PurchaseHistoryServiceService} from '../../services/purchase-history-service.service';
import {OrderDetail} from '../../dto/OrderDetail';
import {ShippingAddress1} from '../../dto/ShippingAddress';
import {ItemServiceService} from '../../services/item-service.service';
import {Items} from '../../dto/Items';
import {NgbModal, NgbModalConfig, NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import {RatingServiceService} from '../../services/rating-service.service';
import * as jspdf from 'jspdf';
import {ItemRateServiceService} from '../../services/item-rate-service.service';
import {ItemRate, ItemRate1} from '../../dto/ItemRate';
// @ts-ignore
import html2canvas from 'html2canvas';
import {NgxSpinnerService} from 'ngx-spinner';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-purchase-history',
    templateUrl: './purchase-history.component.html',
    styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public allOrders: Array<Orders> = [];
    public complaintType: Array<any> = [];
    public abc: Array<any> = [];
    public itemRate = 0;
    showSpinner = true;
    isNoItem = false;
    haveOrders = false;
    public printOrder: Array<any>;
    public id: number;
    public ok = false;
    public oldItemrateId = 0;

    constructor(private purchaseHistoryService: PurchaseHistoryServiceService, private itemService: ItemServiceService,
                private config: NgbRatingConfig, private rateService: RatingServiceService, private configOne: NgbModalConfig,
                private modalService: NgbModal, private itemRateService: ItemRateServiceService, private spinner: NgxSpinnerService) {
        this.getOrderByCustomerId();
        this.getAllComplainType();
        config.max = 5;
        configOne.backdrop = 'static';
        configOne.keyboard = false;

    }

    ngOnInit() {
    }

    public open(id, content) {
        this.id = id;
        this.modalService.open(content);
    }

    public getOrderByCustomerId() {
        setTimeout(() => this.spinner.show(), 0);
        if (localStorage.getItem('loggedIn') === 'true') {
            this.purchaseHistoryService.getOrderByCustomerId(localStorage.getItem('userId'))
                .subscribe((result) => {
                    console.log(result);
                    this.allOrders = result;
                    if (result.length === 0) {
                        setTimeout(() => this.spinner.hide(), 1000);
                        this.isNoItem = true;
                    }
                    this.getOrderDetailForEachOrder(this.allOrders);
                });
        }
    }

    public getOrderDetailForEachOrder(orders: Array<Orders>) {
        for (let i = 0; i < orders.length; i++) {
            this.getShippingAddress(orders[i]);
        }
    }

    public getShippingAddress(order: Orders) {
        this.purchaseHistoryService.getShippingAddresByOrderId(order.id)
            .subscribe((result: ShippingAddress1) => {
                this.getOrderDetails(order, result);
            });
    }

    public getOrderDetails(order: Orders, shipping: ShippingAddress1) {
        this.purchaseHistoryService.getOrderDetailByOrderId(order.id)
            .subscribe((result: Array<OrderDetail>) => {
                console.log(result);
                this.getOrderItem(order, shipping, result);
            });
    }

    public getOrderItem(order: Orders, shipping: ShippingAddress1, orderDetail: Array<OrderDetail>) {
        const detail: Array<any> = [];
        const od: Array<any> = [];

        for (let i = 0; i < orderDetail.length; i++) {
            this.itemService.getItemById(orderDetail[i].itemid)
                .subscribe((result: Items) => {
                    const abcd = {
                        'id': result.id,
                        'price': orderDetail[i].price,
                        'qty': orderDetail[i].qty,
                        'color': orderDetail[i].color,
                        'name': result.name,
                        'brand': result.brand,
                        'image': this.imgBaseUrl + result.image.split(',')[0]
                    };
                    od.push(abcd);
                });
        }

        detail.push(order);
        detail.push(shipping);
        detail.push(od);

        this.abc.push(detail);
        setTimeout(() => this.spinner.hide(), 1000);
        this.showSpinner = false;

        if (this.abc.length === 0) {
            this.isNoItem = true;
        }
    }

    public getAllComplainType() {
        setTimeout(() => this.spinner.show(), 0);
        this.purchaseHistoryService.getAllComplainType()
            .subscribe((result) => {
                this.complaintType = result;
            });
    }

    public sendOrderIdToComplaint(id) {
        this.purchaseHistoryService.changeOrderIdForComplaint(id);
    }

    public sendOrderIdToFeedback(id) {
        this.purchaseHistoryService.changeOrderIdForFeedBack(id);
    }

    public getAllItemRateByItemId(itemId) {
        this.itemRateService.getAllItemRateByItemId(itemId)
            .subscribe((result: Array<any>) => {
                if (result.length === 0) {
                    this.ok = true;
                }
                for (let i = 0; i < result.length; i++) {
                    if (result[i].customerRateId === Number(localStorage.getItem('userId'))) {
                        this.oldItemrateId = result[i].id;
                        this.ok = false;
                    } else {
                        this.ok = true;
                    }
                }
            });
    }

    public addRate(reviewTxt, itemId) {

        if (this.itemRate === 0) {
            Swal.fire('give rate by stars');
        } else if (reviewTxt === '') {
            Swal.fire('please enter your feedback');
        } else {
            this.getAllItemRateByItemId(itemId);
            setTimeout(() => this.finalRateAdd(reviewTxt, itemId), 2000);
        }
    }

    public finalRateAdd(reviewTxt, itemId) {
        if (this.ok) {
            setTimeout(() => this.spinner.show(), 0);
            const customerId = localStorage.getItem('userId');
            this.itemRateService.addRateItem(new ItemRate(this.itemRate, reviewTxt, Number(customerId), itemId))
                .subscribe((result) => {
                    Swal.fire('item rate success. thank you !');
                    setTimeout(() => this.spinner.hide(), 500);
                });
        } else {
            Swal.fire({
                title: '',
                text: 'You have already given rate.If you want to update it click ok ?',
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'ok'
            }).then((result1) => {
                if (result1.value) {
                    setTimeout(() => this.spinner.show(), 0);
                    const customerId = localStorage.getItem('userId');
                    this.rateService.updateItemRate(new ItemRate1(this.itemRate, reviewTxt, this.oldItemrateId,
                        Number(customerId), itemId))
                        .subscribe((result2) => {
                            Swal.fire('item rate update success');
                            setTimeout(() => this.spinner.hide(), 500);
                        });
                }
            });
        }
    }

    public downloadInvoice() {
        const data = document.getElementById('content1');
        html2canvas(data).then(canvas => {
            const imgWidth = 208;
            const pageHeight = 295;
            const imgHeight = canvas.height * imgWidth / canvas.width;
            const heightLeft = imgHeight;

            const contentDataURL = canvas.toDataURL('image/png');
            const pdf = new jspdf('p', 'mm', 'a4');
            const position = 0;
            pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
            pdf.save('Invoice.pdf');
        });

    }
}
