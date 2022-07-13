import {Component, OnInit} from '@angular/core';
import {ProductServiceService} from '../../services/product-service.service';
import {ItemServiceService} from '../../services/item-service.service';
import {Items} from '../../dto/Items';
import {WishlistServiceService} from '../../services/wishlist-service.service';
import {WishList} from '../../dto/WishList';
import {Router} from '@angular/router';
import {Product} from '../../dto/Product';
import {ComparisonService} from '../../services/comparison.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartItem} from '../../dto/CartItem';
import {CartServiceService} from '../../services/cart-service.service';
import {NgxSpinnerService} from 'ngx-spinner';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-item-view',
    templateUrl: './item-view.component.html',
    styleUrls: ['./item-view.component.css']
})

export class ItemViewComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public allBrands: Array<string> = [];
    public topic: string;
    public page: number;
    public allItems: Items[] = [];
    public tempAllItem: Array<Items> = [];

    showSpinner = true;
    public tempItems: Items[] = [];
    public allItemsLength: Array<Items> = [];
    public cart = localStorage.getItem('cartitem');
    public upItem: Items = new Items('', '', 0, 0, '', '', '', '',
        '', 0, '', 0, 0, 0, 0);
    public cartItemList: Array<CartItem> = [];
    public noItemFound = false;

    private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;

    constructor(private productService: ProductServiceService, private itemService: ItemServiceService,
                private wishListService: WishlistServiceService, private router: Router, private comparisonService: ComparisonService,
                private modalService: NgbModal, private cartService: CartServiceService, private spinner: NgxSpinnerService) {
        this.getAllItem();
    }

    ngOnInit() {
        this.itemService.currentSearch
            .subscribe((result) => {
                setTimeout(() => this.spinner.show(), 0);
                this.getItems();
            });

        setTimeout(() => this.staticAlertClosed = true, 20000);

        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(2000)
        ).subscribe(() => this.successMessage = null);

        this.getMaxMinPrices();
    }

    public getMaxMinPrices() {
        this.itemService.currentmaxMinPrieces.subscribe((result) => {
            this.setItemByPrice(result);
        });
    }

    public setItemByPrice(minMax) {
        setTimeout(() => this.spinner.show(), 0);
        this.allItems = this.tempAllItem;
        const temp: Array<Items> = [];
        for (let i = 0; i < this.allItems.length; i++) {
            if (minMax[0] <= this.allItems[i].price) {
                if (minMax[1] >= this.allItems[i].price) {
                    temp.push(this.allItems[i]);
                }
            }
        }
        setTimeout(() => this.spinner.hide(), 1000);
        this.allItems = temp;
    }

    public getItems() {
        setTimeout(() => this.spinner.show(), 0);
        this.allItems = [];
        this.tempAllItem = [];
        if (JSON.parse(localStorage.getItem('selectByProduct'))) {
            this.allItems = [];
            const productId = JSON.parse(localStorage.getItem('productId'));
            this.getItemByProductId(productId);
        } else {
            if (JSON.parse(localStorage.getItem('searchedCategoryId')) !== null) {
                this.allItems = [];
                const categoryId = JSON.parse(localStorage.getItem('searchedCategoryId'));
                this.getProductByRelatedCategory(categoryId);

            } else if (JSON.parse(localStorage.getItem('searchedProductId')) !== null) {
                this.allItems = [];
                const productId = JSON.parse(localStorage.getItem('searchedProductId'));
                this.getItemByProductId(productId);

            } else if (JSON.parse(localStorage.getItem('searchedItemId')) !== null) {
                this.allItems = [];
                const itemIds = JSON.parse(localStorage.getItem('searchedItemId'));
                for (let i = 0; i < itemIds.length; i++) {
                    this.getItemByItemId(itemIds[i]);
                }

            } else {
                this.allItems = [];
            }
        }
    }

    public getProductByRelatedCategory(categoryId) {
        this.allItems = [];
        this.tempAllItem = [];
        this.itemService.getProductByRelatedCategory(categoryId)
            .subscribe((result: Array<Product>) => {
                if (result.length !== 0) {
                    for (let i = 0; i < result.length; i++) {
                        this.getItemByProductId(result[i].id);
                    }
                }
            });
    }

    public getItemByProductId(productId) {
        this.allItems = [];
        this.tempAllItem = [];
        this.itemService.getItemByProductId(productId)
            .subscribe((result: Array<Items>) => {
                if (result.length !== 0) {
                    this.noItemFound = false;
                    for (let i = 0; i < result.length; i++) {
                        result[i].image = this.imgBaseUrl + result[i].image.split(',')[0];
                        this.allItems.push(result[i]);
                        this.tempAllItem.push(result[i]);
                    }
                    setTimeout(() => this.spinner.hide(), 1000);
                } else {
                    this.noItemFound = true;
                    setTimeout(() => this.spinner.hide(), 1000);
                }
            });
    }

    public getItemByItemId(itemId) {
        this.allItems = [];
        this.itemService.getItemById(itemId)
            .subscribe((result: Items) => {
                this.noItemFound = false;
                result.image = this.imgBaseUrl + result.image.split(',')[0];
                this.allItems.push(result);
                this.tempAllItem.push(result);
                setTimeout(() => this.spinner.hide(), 1000);
            });
    }

    public getAllItem() {
        this.itemService.getAllItems()
            .subscribe((result) => {
                this.getAllBrand(result);
            });
    }

    public getAllBrand(allItems: Array<Items>) {
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

    public selectItemByBrand(brand) {
        this.spinner.show();
        this.allItems = this.tempAllItem;
        if (brand === 'select brand') {
            this.allItems = this.tempAllItem;
            this.getItems();
        } else {
            this.noItemFound = true;
            const temp: Array<Items> = [];
            for (let i = 0; i < this.allItems.length; i++) {
                if (this.allItems[i].brand === brand) {
                    temp.push(this.allItems[i]);
                    this.noItemFound = true;
                    this.noItemFound = false;
                }
                setTimeout(() => this.spinner.hide(), 1000);
            }
            this.allItems = temp;
        }
    }

    public getProductName(id) {
        this.productService.getProductById(id)
            .subscribe((result: Product) => {
                this.topic = result.productType;
            });
    }

    public getSearchedItem() {
        this.itemService.currentSearchItems.subscribe((result: Array<Items>) => {
            this.allItems = result;
            this.showSpinner = false;
        });
    }

    public addCart(valueitem) {
        this.itemService.getItemById(valueitem)
            .subscribe((result: Items) => {
                let items: Array<CartItem> = [];
                const qty = result.qtyOnHand;
                if (qty <= 0) {
                    this._success.next('added fail ! no stock available');
                    return;
                }
                const selectedItem = new CartItem(result.name, result.brand, result.qtyOnHand, 1, result.price,
                    this.imgBaseUrl + result.image.split(',')[0],
                    result.status, result.highlights, result.specification, result.overview, result.hits, result.color, result.rate,
                    result.discount, result.productid, result.id);

                if (JSON.parse(localStorage.getItem('cartItemList')) !== null) {
                    const alreadyItem: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
                    let haveItem = true;
                    for (let i = 0; i < alreadyItem.length; i++) {
                        if (valueitem === alreadyItem[i].id) {
                            alreadyItem[i] = selectedItem;
                            localStorage.setItem('cartItemList', JSON.stringify(alreadyItem));
                            this.cartService.changeCount(alreadyItem.length);
                            this._success.next('added success');
                            haveItem = false;
                        }
                    }
                    if (haveItem) {
                        items = JSON.parse(localStorage.getItem('cartItemList'));
                        items.push(selectedItem);
                        localStorage.setItem('cartItemList', JSON.stringify(items));
                        this.cartService.changeCount(items.length);
                        this._success.next('added success');
                    }
                } else {
                    items.push(selectedItem);
                    localStorage.setItem('cartItemList', JSON.stringify(items));
                    this.cartService.changeCount(items.length);
                    this._success.next('added success');
                }
            });
    }

    public getCurrentProductId() {
        this.productService.currentProductId.subscribe((result) => {
            this.getProductName(result);
            this.getItemsByProduct(result);
        });
    }

    public getItemsByProduct(productId) {
        this.itemService.getItemByProductId(productId).subscribe((result) => {
            this.allItems = result;
            this.tempItems = result;
            this.allItemsLength = result;
            this.showSpinner = false;
            this.setMainImage(this.allItems);
        });
    }

    public setMainImage(items) {
        for (let i = 0; i < this.allItemsLength.length; i++) {
            if (!items[i].image.includes(this.imgBaseUrl)) {
                items[i].image = this.imgBaseUrl + items[i].image.split(',')[0];
            }
        }
    }

    public sendItemToCompare(id) {
        this.comparisonService.changeIsSelectItem(true);
        this.itemService.changeItemId(id);
    }

    public addToWishList(id, signIn) {
        if (localStorage.getItem('loggedIn') === 'true') {
            this.wishListService.saveItem(new WishList(id, Number(localStorage.getItem('userId')))).subscribe((result) => {
            });
            this._success.next('wish list added success');
        } else {
            document.getElementById('openModalButton').click();
        }
    }

    public goProductView(item: Items) {
        this.router.navigate(['/productView']);
        localStorage.setItem('productViewItem', JSON.stringify(item.id));
    }

    public itemViewHighToLow() {
        for (let i = 0; i < this.allItems.length - 1; i++) {
            for (let j = 0; j < this.allItems.length - 1; j++) {
                if (this.allItems[j].price < this.allItems[j + 1].price) {
                    const temp = this.allItems[j];
                    this.allItems[j] = this.allItems[j + 1];
                    this.allItems[j + 1] = temp;
                }
            }
        }
        setTimeout(() => this.spinner.hide(), 1000);
        this.tempItems = this.allItems;
    }

    public itemViewLowToHigh() {
        for (let i = 0; i < this.allItems.length - 1; i++) {
            for (let j = 0; j < this.allItems.length - 1; j++) {
                if (this.allItems[j].price > this.allItems[j + 1].price) {
                    const temp = this.allItems[j];
                    this.allItems[j] = this.allItems[j + 1];
                    this.allItems[j + 1] = temp;
                }
            }
        }
        setTimeout(() => this.spinner.hide(), 1000);
        this.tempItems = this.allItems;
    }

    public getSortType(value) {
        if (value === 'price low to high') {
            this.spinner.show();
            this.itemViewLowToHigh();
        } else if (value === 'price high to low') {
            this.spinner.show();
            this.itemViewHighToLow();
        } else {
        }
    }
}
