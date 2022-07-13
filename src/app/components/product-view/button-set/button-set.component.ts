import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ItemServiceService} from '../../../services/item-service.service';
import {Items} from '../../../dto/Items';
import {WishList} from '../../../dto/WishList';
import {WishlistServiceService} from '../../../services/wishlist-service.service';
import {ComparisonService} from '../../../services/comparison.service';
import {CustomerServiceService} from '../../../services/customer-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartItem} from '../../../dto/CartItem';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {CartServiceService} from '../../../services/cart-service.service';
import Swal from 'sweetalert2';
import {ProductServiceService} from '../../../services/product-service.service';
// @ts-ignore
import key from '../../../../../key.json';

@Component({
    selector: 'app-button-set',
    templateUrl: './button-set.component.html',
    styleUrls: ['./button-set.component.css']
})
export class ButtonSetComponent implements OnInit {

    imgBaseUrl = key.baseUrl;
    public widhListImage = '../../../assets/Heart_02.png';
    public itemId;
    qtynm = 1;
    itemmqty: number;
    product_price: number;
    orderPrice: number;
    public cart = localStorage.getItem('cartitem');
    public setLog: string;
    public setRemembers: string;
    public item: Items;

    private _success = new Subject<string>();
    staticAlertClosed = false;
    successMessage: string;

    constructor(private router: Router, private itemService: ItemServiceService, private wishListService: WishlistServiceService,
                private comparisonService: ComparisonService, private customerService: CustomerServiceService,
                private modalService: NgbModal, private cartService: CartServiceService, private productService: ProductServiceService) {
    }

    ngOnInit() {
        this.productService.currentProductId
            .subscribe((result) => {
                this.getItemId();
            });
        this.getItemId();
        this.getCustomerAuth();

        setTimeout(() => this.staticAlertClosed = true, 20000);

        this._success.subscribe((message) => this.successMessage = message);
        this._success.pipe(
            debounceTime(4000)
        ).subscribe(() => this.successMessage = null);
    }

    public getCustomerAuth() {
        this.customerService.currentCustomerAuth
            .subscribe((result) => {
                this.setLog = result.log;
                this.setRemembers = result.remembers;
            });
    }

    public getItemId() {
        if (JSON.parse(localStorage.getItem('productViewItem')) !== null) {
            const itemId = JSON.parse(localStorage.getItem('productViewItem'));
            this.itemService.getItemById(itemId)
                .subscribe((result: Items) => {
                    if (result.discount !== 0) {
                        this.product_price = result.price - (result.price / result.discount);
                        this.orderPrice = result.price - (result.price / result.discount);
                    } else {
                        this.product_price = result.price;
                        this.orderPrice = result.price;
                    }
                    this.item = result;
                    this.itemId = result.id;
                    this.itemmqty = result.qtyOnHand;
                });
        }
    }

    goBuyITnOW(qtyval) {
        if (this.item.qtyOnHand <= 0) {
            this._success.next('no stock available to buy !');
            return;
        } else {
            if (qtyval === 0) {
                Swal.fire(
                    'Warning !',
                    'Please Add Quantity!',
                    'error'
                );
            } else {
                if (localStorage.getItem('loggedIn') === 'true') {
                    const items: Array<CartItem> = [];
                    items.push(new CartItem(this.item.name, this.item.brand, this.item.qtyOnHand, qtyval, this.item.productid,
                        this.imgBaseUrl + this.item.image.split(',')[0],
                        this.item.status, this.item.highlights, this.item.specification, this.item.overview, this.item.hits,
                        this.item.color, this.item.rate, this.item.discount, this.item.productid, this.item.id));
                    localStorage.setItem('cartItemList', JSON.stringify(items));
                    this.router.navigate(['/buy']);
                } else {
                    document.getElementById('openModalButton').click();
                }
            }
        }
    }

    public getItem(id) {
        this.itemService.getItemById(id)
            .subscribe((result: Items) => {
                this.product_price = result.price;
                this.orderPrice = result.price;
            });
    }

    changeImageEnter() {
        this.widhListImage = '../../assets/WishList.png';
    }

    changeImageLeave() {
        this.widhListImage = '../../assets/Heart_02.png';
    }

    goWishList() {
        if (localStorage.getItem('loggedIn') === 'true') {
            this.wishListService.saveItem(new WishList(this.itemId, Number(localStorage.getItem('userId')))).subscribe((result) => {
            });
            this._success.next('wish list added success');
        } else {
            document.getElementById('openModalButton').click();
        }
    }

    public addToCart(qty) {
        this.itemService.getItemById(this.itemId)
            .subscribe((result: Items) => {
                const qtyOnHand = result.qtyOnHand;
                if (qtyOnHand <= 0) {
                    this._success.next('added fail ! no stock available');
                    return;
                }
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
                                if (this.itemId === alreadyItem[i].id) {
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
                }
            });
    }

    goCompare() {
        this.comparisonService.changeIsSelectItem(true);
        this.itemService.changeItemId(this.itemId);
    }

    public setPrice(qty) {
        this.orderPrice = this.product_price;
        this.orderPrice *= qty;
    }
}
