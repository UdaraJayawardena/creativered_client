import {Component, OnInit} from '@angular/core';
import {ItemServiceService} from '../../../services/item-service.service';
import {Items} from '../../../dto/Items';
import {ProductServiceService} from '../../../services/product-service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-product-detail',
    templateUrl: './product-detail.component.html',
    styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

    public name;
    public brand;
    public qtyOnHand;
    public price;
    public highlights;
    public discount;
    public outOfStock = false;

    constructor(private itemService: ItemServiceService, private productService: ProductServiceService,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.productService.currentProductId
            .subscribe((result) => {
                this.getItemId();
            });
        this.getItemId();
    }

    public getItemId() {
        setTimeout(() => this.spinner.show(), 500);
        if (JSON.parse(localStorage.getItem('productViewItem')) !== null) {
            const itemId = JSON.parse(localStorage.getItem('productViewItem'));
            this.itemService.getItemById(itemId)
                .subscribe((result: Items) => {
                    this.setItemDetail(result);
                });
        }
    }

    public setItemDetail(item) {
        this.outOfStock = false;
        if (item.qtyOnHand <= 0) {
            this.outOfStock = true;
        }
        this.name = item.name;
        this.brand = item.brand;
        this.qtyOnHand = item.qtyOnHand;
        this.price = item.price;
        this.highlights = item.highlights;
        this.discount = item.discount;
        setTimeout(() => this.spinner.hide(), 500);
    }
}
