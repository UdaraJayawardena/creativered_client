import {Component, OnInit} from '@angular/core';
import {Items} from '../../dto/Items';
import {ItemServiceService} from '../../services/item-service.service';
import {Router} from '@angular/router';
import {News} from '../../dto/News';
import {DealsServiceService} from '../../services/deals-service.service';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public deals: Array<Items> = [];
    public slideConfig = {'slidesToShow': 4, 'slidesToScroll': 4};
    public dealsItems: Array<Items> = [];

    constructor(private itemService: ItemServiceService, private router: Router, private dealsService: DealsServiceService) {
    }

    ngOnInit() {
        this.getDeals();
    }

    public goProductView(item) {
        this.router.navigate(['/productView']);
        localStorage.setItem('productViewItem', JSON.stringify(item.id));
    }

    public getDeals() {
        this.dealsService.getAllNews()
            .subscribe((result: Array<News>) => {
                const itemID: Array<number> = [];
                for (let i = 0; i < result.length; i++) {
                    if (result[i].status === 'price' || result[i].status === 'discount') {
                        itemID.push(result[i].item_id);
                    }
                }

                for (let i = 0; i < itemID.length; i++) {
                    let count = 0;
                    for (let j = 0; j < itemID.length; j++) {
                        if (itemID[i] === itemID[j]) {
                            count++;
                            if (count > 1) {
                                itemID.splice(j, 1);
                            }
                        }
                    }
                }

                setTimeout(() => {
                    for (let i = 0; i < itemID.length; i++) {
                        this.itemService.getItemById(itemID[i])
                            .subscribe((dealItem: Items) => {
                                dealItem.image = this.imgBaseUrl + dealItem.image.split(',')[0];
                                this.deals.push(dealItem);
                            });
                    }
                }, 500);
            });
    }
}
