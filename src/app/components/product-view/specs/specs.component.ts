import {Component, OnInit} from '@angular/core';
import {ItemServiceService} from '../../../services/item-service.service';
import {Items} from '../../../dto/Items';
import {OrderDetailServiceService} from '../../../services/order-detail-service.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {ItemRate} from '../../../dto/ItemRate';
import {CustomerServiceService} from '../../../services/customer-service.service';
import {Customerss} from '../../../dto/Customer';
import {ProductServiceService} from '../../../services/product-service.service';

class RateItems {
    customerName: string;
    numberOfStars: number;
    feedBack: string;

    constructor(customerName: string, numberOfStars: number, feedBack: string) {
        this.customerName = customerName;
        this.numberOfStars = numberOfStars;
        this.feedBack = feedBack;
    }
}

@Component({
    selector: 'app-specs',
    templateUrl: './specs.component.html',
    styleUrls: ['./specs.component.css']
})

export class SpecsComponent implements OnInit {

    public item: Items = new Items();
    public rate: Array<ItemRate> = [];
    public rateList: Array<RateItems> = [];

    constructor(private itemService: ItemServiceService, private orderDetailService: OrderDetailServiceService,
                private config: NgbRatingConfig, private customerService: CustomerServiceService,
                private productService: ProductServiceService) {
        config.max = 5;
        config.readonly = true;
    }

    ngOnInit() {
        this.productService.currentProductId
            .subscribe((result) => {
                this.getItemId();
            });
        this.getItemId();
    }

    public getItemRateByItemId(itemId) {
        this.itemService.getItemRateByItemId(itemId)
            .subscribe((result: Array<ItemRate>) => {
                for (let i = 0; i < result.length; i++) {
                    this.getCustomerById(result[i]);
                }
            });
    }

    public getCustomerById(itemRate: ItemRate) {
        this.customerService.getCustomerById(itemRate.customerRateId)
            .subscribe((result: Customerss) => {
                this.rateList.push(new RateItems(result.username.substring(0, 4) + '__', itemRate.rate, itemRate.review));
            });
    }

    public getItemId() {
        if (JSON.parse(localStorage.getItem('productViewItem')) !== null) {
            const itemId = JSON.parse(localStorage.getItem('productViewItem'));
            this.getItemRateByItemId(itemId);
            this.itemService.getItemById(itemId)
                .subscribe((result: Items) => {
                    this.item = result;
                });
        }
    }
}
