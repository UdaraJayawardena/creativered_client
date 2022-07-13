import {Component, OnInit} from '@angular/core';
import {ComparisonService} from '../../services/comparison.service';
import {ItemServiceService} from '../../services/item-service.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartItem} from '../../dto/CartItem';
import {CartServiceService} from '../../services/cart-service.service';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    constructor(private router: Router, private comparison: ComparisonService, private itemservice: ItemServiceService,
                private modalService: NgbModal, private cartService: CartServiceService) {
    }

    public cartItem: Array<CartItem> = [];
    public haveCartItem = true;

    ngOnInit() {
        this.getCartItem();
    }

    public getCartItem() {
        const cartItem: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
        if (cartItem !== null) {
            if (cartItem.length === 0) {
                this.haveCartItem = false;
            }
            this.cartItem = cartItem;
        } else {
            this.haveCartItem = false;
        }
    }

    public removeItem(itemId) {
        const cartItemList: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
        for (let i = 0; i < cartItemList.length; i++) {
            if (cartItemList[i].id === itemId) {
                cartItemList.splice(i, 1);
            }
        }
        localStorage.setItem('cartItemList', JSON.stringify(cartItemList));
        this.cartService.changeCount(cartItemList.length);
        this.getCartItem();
    }

    public checkChange(id, qty) {
        if (Number(qty) >= 1) {
            const cartItem: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
            for (let i = 0; i < cartItem.length; i++) {
                if (cartItem[i].id === id) {
                    if (cartItem[i].qtyOnHand >= qty) {
                        cartItem[i].cartQty = Number(qty);
                    } else {
                        alert('You added qty more than available. please check !');
                    }
                }
            }
            localStorage.setItem('cartItemList', JSON.stringify(cartItem));
            setTimeout(() => this.getCartItem(), 10000);
        } else {
            setTimeout(() => this.getCartItem(), 10000);
        }
    }

    public makeOrderDetail() {
        if (localStorage.getItem('loggedIn') === 'true') {
            const cartItem: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
            let noQty = false;
            for (let i = 0; i < cartItem.length; i++) {
                if (cartItem[i].cartQty === 0) {
                    noQty = true;
                }
            }
            if (noQty) {
                Swal.fire('add qty for all items');
            } else {
                this.router.navigate(['/buy']);
            }
        } else {
            document.getElementById('openModalButton').click();
        }
    }
}
