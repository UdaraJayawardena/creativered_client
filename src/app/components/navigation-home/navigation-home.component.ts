import {Component, OnInit} from '@angular/core';
import {CategoryServiceService} from '../../services/category-service.service';
import {Categories} from '../../dto/Categories';
import {Product} from '../../dto/Product';
import {ProductServiceService} from '../../services/product-service.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';
import {ItemServiceService} from '../../services/item-service.service';
import {CustomerServiceService} from '../../services/customer-service.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CartServiceService} from '../../services/cart-service.service';
import {DealsServiceService} from '../../services/deals-service.service';
import {News} from '../../dto/News';

@Component({
    selector: 'app-navigation-home',
    templateUrl: './navigation-home.component.html',
    styleUrls: ['./navigation-home.component.css']
})
export class NavigationHomeComponent implements OnInit {
    public categories: Categories[];
    public products: Product[];
    public noOfProducts: Array<Product> = [];
    public productByCategory: Product[];
    public isLogin: boolean;
    public wishlistimage: string;
    public profileimage: string;
    public cartimage;
    public setLog: string;
    public setRemembers: string;
    public cartCount = 0;

    constructor(private categoryService: CategoryServiceService, private productService: ProductServiceService,
                private itemService: ItemServiceService, private router: Router, private customerService: CustomerServiceService,
                private modalService: NgbModal, private cartService: CartServiceService, private dealsService: DealsServiceService) {
    }

    ngOnInit() {
        this.setCartCount();
        setInterval(() => this.setCount(), 100);
        this.getAllCategories();
        this.getAllProducts();
        if (localStorage.getItem('loggedIn') === 'true') {
            const dropa = document.getElementById('dropdownMenuButton') as HTMLElement;
            const val4 = document.getElementById('cart-count') as HTMLElement;
            val4.style.color = '#d60d39';
            dropa.style.color = '#d60d39';
            this.wishlistimage = '../../assets/Heart_100px.png';
            this.profileimage = '../../assets/User_96px.png';
            this.cartimage = '../../assets/Shopping Cart_96px.png';
            const loga = document.getElementById('logouta') as HTMLElement;
            loga.style.display = 'block';
            const sin = document.getElementById('signIn') as HTMLElement;
            sin.style.display = 'none';
            const sup = document.getElementById('signUp') as HTMLElement;
            sup.style.display = 'none';
        } else {
            const dropa = document.getElementById('dropdownMenuButton') as HTMLElement;
            const val4 = document.getElementById('cart-count') as HTMLElement;
            val4.style.color = '#000000';
            dropa.style.color = '#000000';
            this.wishlistimage = '../../assets/WishList.png';
            this.profileimage = '../../assets/User.png';
            this.cartimage = '../../assets/icons8_Shopping_Cart_96px.png';
            const loga = document.getElementById('logouta') as HTMLElement;
            loga.style.display = 'none';
            const sin = document.getElementById('signIn') as HTMLElement;
            sin.style.display = 'block';
            const sup = document.getElementById('signUp') as HTMLElement;
            sup.style.display = 'block';
        }

        this.getIsCustomerLogin();
        this.getCustomerAuth();
    }

    public setCount() {
        if (JSON.parse(localStorage.getItem('cartItemList')) !== null) {
            this.cartCount = JSON.parse(localStorage.getItem('cartItemList')).length;
        }
    }

    public setCartCount() {
        if (JSON.parse(localStorage.getItem('cartItemList')) !== null) {
            this.cartCount = JSON.parse(localStorage.getItem('cartItemList')).length;
        }
        this.cartService.runChangeCartCount
            .subscribe((result: number) => {
                this.cartCount = result;
            });
    }

    public startHover() {

        if (localStorage.getItem('loggedIn') === 'true') {
            const val = document.getElementById('proid') as HTMLElement;
            val.style.borderWidth = '2px';
            val.style.borderColor = '#b41939';

            const val2 = document.getElementById('wishlist-icon') as HTMLElement;
            val2.style.borderWidth = '2px';
            val2.style.borderColor = '#b41939';

            const val3 = document.getElementById('cart-icon') as HTMLElement;
            val3.style.borderWidth = '2px';
            val3.style.borderColor = '#b41939';

        } else if (localStorage.getItem('loggedIn') === 'false') {
            const val = document.getElementById('proid') as HTMLElement;
            val.style.borderWidth = '2px';
            val.style.borderColor = '#000000';

            const val2 = document.getElementById('wishlist-icon') as HTMLElement;
            val2.style.borderWidth = '2px';
            val2.style.borderColor = '#000000';

            const val3 = document.getElementById('cart-icon') as HTMLElement;
            val3.style.borderWidth = '2px';
            val3.style.borderColor = '#000000';
        }
    }

    public getCustomerAuth() {
        this.customerService.currentCustomerAuth
            .subscribe((result) => {
                this.setLog = result.log;
                this.setRemembers = result.remembers;
            });
    }

    public getIsCustomerLogin() {
        this.customerService.currentIsLogin
            .subscribe((result: boolean) => {
                this.isLogin = !result;
            });
    }

    public getAllCategories() {
        this.categoryService.getAllCategories()
            .subscribe((result) => {
                this.categories = result;
            });
    }

    public getAllProducts() {
        this.productService.getAllProducts()
            .subscribe((result) => {
                this.products = result;
                this.noOfProducts = result;
            });
    }

    public getProduct(id) {
        this.productByCategory = [];
        for (let i = 0; i < this.noOfProducts.length; i++) {
            if (this.products[i].categoryid === id) {
                this.productByCategory.push(this.products[i]);
            }
        }
    }

    logOut() {

        Swal.fire({
            title: '',
            text: 'You won\'t be able to logout ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                localStorage.setItem('loggedIn', 'false');
                Swal.fire(
                    'Logged out !',
                    '',
                    'info'
                );
                const dropa = document.getElementById('dropdownMenuButton') as HTMLElement;
                const val4 = document.getElementById('cart-count') as HTMLElement;
                val4.style.color = '#000000';
                dropa.style.color = '#000000';
                this.wishlistimage = '../../assets/WishList.png';
                this.profileimage = '../../assets/User.png';
                this.cartimage = '../../assets/icons8_Shopping_Cart_96px.png';
                const loga = document.getElementById('logouta') as HTMLElement;
                loga.style.display = 'none';
                const sin = document.getElementById('signIn') as HTMLElement;
                sin.style.display = 'block';
                const sup = document.getElementById('signUp') as HTMLElement;
                sup.style.display = 'block';
                this.customerService.changeIsLogin(false);
            }
        });
        this.router.navigate(['/home']);
    }

    goWishList() {
        if (localStorage.getItem('loggedIn') === 'true') {
            this.router.navigate(['/wishList']);

        } else {
            document.getElementById('openModalButton').click();
        }
    }

    goProfile() {
        if (localStorage.getItem('loggedIn') === 'true') {
            this.router.navigate(['/profile']);

        } else {
            document.getElementById('openModalButton').click();
        }
    }

    goPurchaseHistory() {
        if (localStorage.getItem('loggedIn') === 'true') {
            this.router.navigate(['/purchaseHistory']);

        } else {
            document.getElementById('openModalButton').click();
        }

    }

    viewItems(id) {
        localStorage.setItem('selectByProduct', JSON.stringify(true));
        localStorage.setItem('productId', JSON.stringify(id));
        this.itemService.changeSearch();
        this.router.navigate(['/itemView']);
    }

    public getDeals() {
        localStorage.setItem('selectByProduct', JSON.stringify(false));
        localStorage.removeItem('searchedCategoryId');
        localStorage.removeItem('searchedProductId');
        localStorage.removeItem('searchedItemId');
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
                localStorage.setItem('searchedItemId', JSON.stringify(itemID));
                this.itemService.changeSearch();
                this.router.navigate(['/itemView']);
            });
    }
}
