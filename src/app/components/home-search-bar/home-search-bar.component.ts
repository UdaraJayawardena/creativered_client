import {Component, OnInit} from '@angular/core';
import {Items} from '../../dto/Items';
import {ComparisonService} from '../../services/comparison.service';
import {Categories} from '../../dto/Categories';
import {Product} from '../../dto/Product';
import {HomeSearchBarServiceService} from '../../services/home-search-bar-service.service';
import {ItemServiceService} from '../../services/item-service.service';
import {Router} from '@angular/router';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-home-search-bar',
    templateUrl: './home-search-bar.component.html',
    styleUrls: ['./home-search-bar.component.css']
})
export class HomeSearchBarComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    mainarray: Array<Items> = [];
    mainitmarray: Array<Items> = [];
    mainprarray: Product[];
    maincatarray: Categories[];
    public it2 = ' ';
    public allBrands: Array<string> = [];
    public itemByProduct: Array<Items> = [];

    constructor(private comparisonservice: ComparisonService, private homesearchbar: HomeSearchBarServiceService,
                private itemService: ItemServiceService, private router: Router) {
    }

    ngOnInit() {
        this.getItemDetail();
        this.getProductDetail();
        this.getCategoryDetail();
    }

    getItemDetail() {
        this.comparisonservice.getAllItemDetail()
            .subscribe((result1: Array<Items>) => {
                this.mainitmarray = result1;
                this.getAllBrand(result1);
            });
    }

    public getAllBrand(allItems: Array<Items>) {
        this.allBrands = [];
        for (let i = 0; i < allItems.length; i++) {
            let isAvailable = true;
            for (let j = 0; j < this.allBrands.length; j++) {
                if (this.allBrands[j] === allItems[i].brand) {
                    isAvailable = false;
                }
            }
            if (isAvailable) {
                this.allBrands.push(allItems[i].brand);
            }
        }
    }

    getProductDetail() {
        this.homesearchbar.getAllProduct()
            .subscribe((result1) => {
                this.mainprarray = result1;
            });
    }

    getCategoryDetail() {
        this.homesearchbar.getAllCategories()
            .subscribe((result1) => {
                this.maincatarray = result1;
            });
    }

    searchkeyup3(val) {
        if (val.length >= 3) {
            if (val === '') {
                const itsr1 = document.getElementById('searchitemdiv2') as HTMLElement;
                itsr1.style.display = 'none';
            } else {
                const itsr1 = document.getElementById('searchitemdiv2') as HTMLElement;
                itsr1.style.display = 'block';
                this.getItemDetail();
                this.getCategoryDetail();
                this.getProductDetail();
                this.it2 = '';
                const val1 = val.toLowerCase();
                const res1: Array<Items> = this.mainitmarray;
                for (let i = 0; i < this.allBrands.length; i++) {
                    this.it2 += this.allBrands[i] + ',';
                }

                for (let i = 0; i < res1.length; i++) {
                    this.it2 += res1[i].name + ',';
                }
                const res2: Array<Categories> = this.maincatarray;
                for (let i = 0; i < res2.length; i++) {
                    this.it2 += res2[i].category + ',';
                }
                const res3: Array<Product> = this.mainprarray;
                for (let i = 0; i < res3.length; i++) {
                    this.it2 += res3[i].productType + ',';
                }
                const stri = this.it2.split(',');
                const itt: Array<Items> = [];
                for (let p = 0; p < stri.length; p++) {
                    const newnm = stri[p].toLowerCase();
                    if (newnm.includes(val1)) {
                        itt.push(new Items(newnm));
                    }
                }
                this.mainarray = itt;
            }
        }
    }

    public getItemById(itemId) {
        this.itemService.getItemById(itemId)
            .subscribe((result: Items) => {
                result.image = this.imgBaseUrl + result.image.split(',')[0];
                this.itemByProduct.push(result);
            });
    }

    public getItemValue1(value) {
        localStorage.setItem('selectByProduct', JSON.stringify(false));
        localStorage.removeItem('searchedCategoryId');
        localStorage.removeItem('searchedProductId');
        localStorage.removeItem('searchedItemId');

        for (let i = 0; i < this.maincatarray.length; i++) {
            if (this.maincatarray[i].category.toLowerCase() === value) {
                localStorage.setItem('searchedCategoryId', JSON.stringify(this.maincatarray[i].id));
                this.router.navigate(['/itemView']);
                this.itemService.changeSearch();
            }
        }

        for (let i = 0; i < this.mainprarray.length; i++) {
            if (this.mainprarray[i].productType.toLowerCase() === value) {
                localStorage.setItem('searchedProductId', JSON.stringify(this.mainprarray[i].id));
                this.router.navigate(['/itemView']);
                this.itemService.changeSearch();
            }
        }

        const itemArray: Array<number> = [];
        for (let i = 0; i < this.mainitmarray.length; i++) {
            if (this.mainitmarray[i].name.toLowerCase() === value) {
                itemArray.push(this.mainitmarray[i].id);
                this.router.navigate(['/itemView']);
            }
            if (this.mainitmarray[i].brand.toLowerCase() === value) {
                itemArray.push(this.mainitmarray[i].id);
                this.router.navigate(['/itemView']);
            }
        }
        if (itemArray.length !== 0) {
            localStorage.setItem('searchedItemId', JSON.stringify(itemArray));
            this.itemService.changeSearch();
        }
    }
}
