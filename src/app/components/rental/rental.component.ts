import {Component, OnInit} from '@angular/core';
import {CategoryServiceService} from '../../services/category-service.service';
import {Categories} from '../../dto/Categories';
import {RentalItem} from '../../dto/RentalItem';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-rental',
    templateUrl: './rental.component.html',
    styleUrls: ['./rental.component.css']
})
export class RentalComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public selectedCategory;
    public categories: Array<Categories> = [];
    public itemList: Array<RentalItem> = [];
    public noItem = false;
    public image = '';

    constructor(private categoryService: CategoryServiceService) {
        // this.getAllCategory();
    }

    ngOnInit() {

    }

    getAllCategory() {
        this.categoryService.getAllCategories()
            .subscribe((result: Array<Categories>) => {
                console.log(result);
                this.getItemByCategoryId(result[0].id);
                this.categories = result;
                this.selectedCategory = result[0].category;
            });
    }

    getItemByCategoryId(id) {
        this.categoryService.getRentalItemByCategory(id)
            .subscribe((result) => {
                if (result.length === 0) {
                    this.noItem = true;
                }
                for (let i = 0; i < result.length; i++) {
                    result[i].url = this.imgBaseUrl + result[i].url.split(',')[0];
                    this.image = result[i].url;
                }
                this.itemList = result;
            });
    }

    getItemByCategory(category: Categories) {
        this.noItem = false;
        this.getItemByCategoryId(category.id);
        this.selectedCategory = category.category;
    }

    addItemToRent(id) {
        localStorage.setItem('rentItemId', JSON.stringify(id));
    }
}
