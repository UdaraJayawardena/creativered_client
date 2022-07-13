import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProductServiceService} from '../../services/product-service.service';
import {ItemServiceService} from '../../services/item-service.service';
import {Items} from '../../dto/Items';

@Component({
    selector: 'app-search-price-range-bar',
    templateUrl: './search-price-range-bar.component.html',
    styleUrls: ['./search-price-range-bar.component.css']
})
export class SearchPriceRangeBarComponent implements OnInit {

    public minPrice = 0;
    public maxPrice = 0;

    constructor(private productService: ProductServiceService, private router: Router, private itemService: ItemServiceService) {
    }

    ngOnInit() {
        this.getAllItems();
        this.getMaxMinPrices();
    }

    public getMaxMinPrices() {
        this.itemService.currentmaxMinPrieces.subscribe((result) => {
            this.minPrice = result[0];
            this.maxPrice = result[1];
        });
    }

    public getAllItems() {
        localStorage.setItem('selectByProduct', JSON.stringify(false));
        localStorage.removeItem('searchedCategoryId');
        localStorage.removeItem('searchedProductId');
        localStorage.removeItem('searchedItemId');
        const itemIds: Array<number> = [];
        this.itemService.getAllItems()
            .subscribe((result: Array<Items>) => {
                for (let i = 0; i < result.length; i++) {
                    if (result[i].price >= this.minPrice && result[i].price <= this.maxPrice) {
                        itemIds.push(result[i].id);
                        localStorage.setItem('searchedItemId', JSON.stringify(itemIds));
                    }
                }
            });
        setTimeout(() => this.itemService.changeSearch(), 2500);
    }

    public getItems() {
        this.getAllItems();
        this.router.navigate(['/itemView']);
    }
}
