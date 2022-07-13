import {Component, OnInit} from '@angular/core';
import {ItemServiceService} from '../../services/item-service.service';
import {Items} from '../../dto/Items';
import {ProductServiceService} from '../../services/product-service.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-product-view',
    templateUrl: './product-view.component.html',
    styleUrls: ['./product-view.component.css']
})
export class ProductViewComponent implements OnInit {

    public product_name;

    constructor(private itemService: ItemServiceService, private productService: ProductServiceService,
                private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.productService.currentProductId
            .subscribe(result => {
                this.getItemName();
            });
        this.getItemName();
        const elementById = document.getElementById('main') as HTMLElement;
        elementById.style.backgroundPosition = 'center top';
    }

    public getItemName() {
        setTimeout(() => this.spinner.show(), 500);
        if (JSON.parse(localStorage.getItem('productViewItem')) !== null) {
            const itemId = JSON.parse(localStorage.getItem('productViewItem'));
            this.itemService.getItemById(itemId)
                .subscribe((result: Items) => {
                    this.product_name = result.name;
                    setTimeout(() => this.spinner.hide(), 1000);
                });
        }
    }
}
