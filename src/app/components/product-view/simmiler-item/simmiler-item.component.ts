import {Component, OnInit} from '@angular/core';
import {Items} from '../../../dto/Items';
import {ItemServiceService} from '../../../services/item-service.service';
import {Router} from '@angular/router';
import {ProductServiceService} from '../../../services/product-service.service';
// @ts-ignore
import key from '../../../../../key.json';

@Component({
    selector: 'app-simmiler-item',
    templateUrl: './simmiler-item.component.html',
    styleUrls: ['./simmiler-item.component.css']
})
export class SimmilerItemComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public slideConfig = {'slidesToShow': 4, 'slidesToScroll': 4};
    public items: Array<Items> = [];
    public noSimilarItem = false;


    constructor(private itemService: ItemServiceService, private router: Router, private productService: ProductServiceService) {
    }

    ngOnInit() {
        this.getItemId();
    }

    public getItemId() {
        this.items = [];
        this.noSimilarItem = false;
        if (JSON.parse(localStorage.getItem('productViewItem')) !== null) {
            const itemId = JSON.parse(localStorage.getItem('productViewItem'));
            this.itemService.getItemById(itemId)
                .subscribe((result: Items) => {
                    this.getAllItemByProduct(result.productid);
                });
        }
    }

    public getAllItemByProduct(productId) {
        this.itemService.getItemByProductId(productId)
            .subscribe((result: Array<Items>) => {
                if (result.length !== 1) {
                    this.setImage(result);
                } else {
                    this.noSimilarItem = true;
                }
            });
    }

    public setImage(items: Array<Items>) {
        const itemId = JSON.parse(localStorage.getItem('productViewItem'));
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === itemId) {
                items.splice(i, 1);
            }
        }
        for (let i = 0; i < items.length; i++) {
            items[i].image = this.imgBaseUrl + items[i].image.split(',')[0];
        }
        this.items = items;
    }

    public getItemDetail(item: Items) {
        this.items = [];
        this.router.navigate(['/productView']);
        localStorage.setItem('productViewItem', JSON.stringify(item.id));
        this.productService.changeItem(item.id);
    }

}
