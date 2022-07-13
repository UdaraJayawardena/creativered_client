import {Component, Input, OnInit} from '@angular/core';
import {PurchaseHistoryServiceService} from '../../services/purchase-history-service.service';
import {Orders} from '../../dto/Orders';
import {ShippingAddress} from '../../dto/ShippingAddress';
import {OrderDetail} from '../../dto/OrderDetail';
import {Items} from '../../dto/Items';
import {ItemServiceService} from '../../services/item-service.service';
import {BillingAddressServiceService} from '../../services/billing-address-service.service';
import {BillingAddress1} from '../../dto/BillingAddress';
// @ts-ignore
import key from '../../../../key.json';

class ItemDetail {
    model: string;
    brand: string;
    qty: number;
    image: string;
    price: number;

    constructor(model: string, brand: string, qty: number, image: string, price: number) {
        this.model = model;
        this.brand = brand;
        this.qty = qty;
        this.image = image;
        this.price = price;
    }
}

@Component({
    selector: 'app-invoice',
    templateUrl: './invoice.component.html',
    styleUrls: ['./invoice.component.css']
})

export class InvoiceComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    @Input() orderId: number;
    public order: Orders = new Orders('', '', '', '', '', '1', 1,
        1, 1, 1);
    public shippingAddress: ShippingAddress = new ShippingAddress();
    public billingAddress: BillingAddress1 = new BillingAddress1('', '', '', '', '',
        '', '', true, 0);
    public orderDetails: Array<OrderDetail> = [];
    public items: Array<ItemDetail> = [];
    public orderTotal = 0;


    constructor(private purchaseHistoryService: PurchaseHistoryServiceService, private itemService: ItemServiceService,
                private billingAddressService: BillingAddressServiceService) {
    }

    ngOnInit() {
        this.getOrder();
        this.getShippingAddress();
        this.getBillingAddress();
        this.getOrderDetails();
    }

    public getOrder() {
        if (this.orderId !== null) {
            this.purchaseHistoryService.getOrderById(this.orderId)
                .subscribe((result: Orders) => {
                    this.order = result;

                });
        }
    }

    public getShippingAddress() {
        if (this.orderId !== null) {
            this.purchaseHistoryService.getShippingAddresByOrderId(this.orderId)
                .subscribe((result: ShippingAddress) => {
                    this.shippingAddress = result;

                });
        }
    }

    public getBillingAddress() {
        if (this.orderId !== null) {
            this.billingAddressService.getBillingAddressByOrderId(this.orderId)
                .subscribe((result: BillingAddress1) => {
                    this.billingAddress = result;
                });
        }
    }

    public getOrderDetails() {
        if (this.orderId !== null) {
            this.purchaseHistoryService.getOrderDetailByOrderId(this.orderId)
                .subscribe((result: Array<OrderDetail>) => {
                    this.orderDetails = result;
                    this.getItem(this.orderDetails);
                });
        }
    }

    public getItem(orderDetails: Array<OrderDetail>) {
        this.items = [];
        this.orderTotal = 0;
        for (let i = 0; i < orderDetails.length; i++) {
            this.itemService.getItemById(orderDetails[i].itemid)
                .subscribe((result: Items) => {
                    result.image = this.imgBaseUrl + result.image.split(',')[0];
                    this.items.push(new ItemDetail(result.name, result.brand, orderDetails[i].qty, result.image, orderDetails[i].price));
                    this.orderTotal += orderDetails[i].price;
                });
        }
    }
}
