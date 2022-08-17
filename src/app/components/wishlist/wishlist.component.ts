import {Component, OnInit} from '@angular/core';
import {WishlistServiceService} from '../../services/wishlist-service.service';
import {WishList} from '../../dto/WishList';
import {ItemServiceService} from '../../services/item-service.service';
import {Items} from '../../dto/Items';
import {Router} from '@angular/router';
import {CartItem} from '../../dto/CartItem';
import {CartServiceService} from '../../services/cart-service.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgxSpinnerService} from 'ngx-spinner';
// @ts-ignore
import key from '../../../../key.json';

@Component({
    selector: 'app-wishlist',
    templateUrl: './wishlist.component.html',
    styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public deleteBtn = '../../assets/Trash_48px.png';
    public wishList: Array<WishList>;
    public items: Array<Items> = [];
    public isNoItem = false;
    showSpinner = true;

    private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;

    constructor(private wishListService: WishlistServiceService, private itemService: ItemServiceService, private router: Router,
                private cartService: CartServiceService, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.reloadPage();

        setTimeout(() => this.staticAlertClosed = true, 20000);
        console.log(this.items);
        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(4000)
        ).subscribe(() => this.successMessage = null);
    }

    public reloadPage() {
        setTimeout(() => this.spinner.show(), 0);
        this.wishListService.currentRemoveItemId
            .subscribe((result) => {
                this.getallWishListItem();
            });
    }

    public getallWishListItem() {
        this.items = [];
        this.wishList = [];
        this.wishListService.getAllWishListItem()
            .subscribe((result) => {
                this.filterByCustomer(result);
            });
    }

    public filterByCustomer(result: Array<WishList>) {
        for (let i = 0; i < result.length; i++) {
            if (result[i].customerWishlistId === Number(localStorage.getItem('userId'))) {
                this.wishList.push(result[i]);
                this.getItemDetail(result[i].itemId);
            }
        }
        setTimeout(() => this.spinner.hide(), 1000);
        if (this.wishList.length === 0) {
            this.isNoItem = true;
        }
    }

    public getItemDetail(id) {
        this.itemService.getItemById(id)
            .subscribe((result) => {
                this.setMainImage(result);
                this.showSpinner = false;
            });
    }

    public setMainImage(item) {
        item.image = this.imgBaseUrl + item.image.split(',')[0];
        this.items.push(item);
    }

    public removeItem(item) {
        let wishListId: number;
        for (let i = 0; i < this.wishList.length; i++) {
            if (item.id === Number(this.wishList[i].itemId)) {
                wishListId = this.wishList[i].id;
            }
        }
        this.wishListService.removeItemById(wishListId)
            .subscribe((result) => {

                this.wishListService.changeRemoveItemId(result.id);
            });
    }

    public moveToCart(qty, id) {
        this.itemService.getItemById(id)
            .subscribe((result: Items) => {
                if (qty > 0) {
                    if (qty <= result.qtyOnHand) {
                        let items: Array<CartItem> = [];
                        const selectedItem = new CartItem(result.name, result.brand, result.qtyOnHand, Number(qty), result.price,
                            this.imgBaseUrl + result.image.split(',')[0],
                            result.status, result.highlights, result.specification, result.overview, result.hits, result.color, result.rate,
                            result.discount, result.productid, result.id);

                        if (JSON.parse(localStorage.getItem('cartItemList')) !== null) {
                            const alreadyItem: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
                            let haveItem = true;
                            for (let i = 0; i < alreadyItem.length; i++) {
                                if (id === alreadyItem[i].id) {
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
                    } else {
                        this._success.next('You added qty more than available. please check !');
                    }
                } else {
                    this._success.next('please enter qty one or more !');
                    this._success.next('please enter qty one or more !');
                }

            });
    }
}
