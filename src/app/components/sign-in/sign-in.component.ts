import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerServiceService} from '../../services/customer-service.service';
import {Customer1, Customer3, CustomerUser} from '../../dto/Customer';
import Swal from 'sweetalert2';
import {NavigationHomeComponent} from '../navigation-home/navigation-home.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-in',
    templateUrl: './sign-in.component.html',
    styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
    @ViewChild('closeModal') closeModal: ElementRef;

    public remember = 'true';
    public wrongEmail = false;
    public emailValue;
    public emailInput = false;
    public emailRegex = new RegExp('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$');

    public wrongPassword = false;
    public passwordValue;
    public passwordInput = false;
    public passwordRegex = new RegExp('^[a-zA-Z0-9]{8,14}$');

    constructor(private navigation: NavigationHomeComponent, private customerService: CustomerServiceService, private router: Router) {
    }

    ngOnInit() {
    }

    public emailClick() {
        this.wrongEmail = false;
        this.emailInput = false;
    }

    public passwordClick() {
        this.wrongPassword = false;
        this.passwordInput = false;
    }

    setRemember(value) {
        this.remember = value.currentTarget.checked.toString();
    }

    loginCustomer(email, password) {
        let ok = false;
        if (email === '') {
            this.emailInput = true;
            ok = false;
        } else {
            this.emailInput = false;
            ok = true;
        }

        if (password === '') {
            this.passwordInput = true;
            ok = false;
        } else {
            this.passwordInput = false;
            ok = true;
        }

        if (ok) {
            let allOk = false;
            if (this.emailRegex.test(email)) {
                this.wrongEmail = false;
                allOk = true;
            } else {
                this.wrongEmail = true;
                allOk = false;
                return;
            }

            if (this.passwordRegex.test(password)) {
                this.wrongPassword = false;
                allOk = true;
            } else {
                this.wrongPassword = true;
                allOk = false;
                return;
            }

            if (allOk) {
                const loginobj = new Customer3(email, password);
                this.customerService.loginCustomer(loginobj)
                    .subscribe((result: CustomerUser) => {
                        localStorage.setItem('tokenId', result.id);
                        localStorage.setItem('userId', result.userId.toString());
                        this.checkVerify(result.userId);
                    }, (error => {
                        Swal.fire(
                            'Warning !',
                            'Failed to Login !',
                            'error'
                        );
                    }));
            }
        }
    }

    checkVerify(userId: number) {
        this.customerService.checkVerify(userId)
            .subscribe((result: Customer1) => {
                if (result.emailVerified) {
                    localStorage.setItem('userEmail', result.email);
                    localStorage.setItem('loggedIn', 'true');
                    this.closeModal.nativeElement.click();
                    Swal.fire(
                        'Login Success !',
                        '',
                        'success'
                    );
                    const dropa = document.getElementById('dropdownMenuButton') as HTMLElement;
                    dropa.style.color = '#d60d39';
                    const val4 = document.getElementById('cart-count') as HTMLElement;
                    val4.style.color = '#d60d39';
                    this.navigation.wishlistimage = '../../assets/Heart_100px.png';
                    this.navigation.profileimage = '../../assets/User_96px.png';
                    this.navigation.cartimage = '../../assets/Shopping Cart_96px.png';
                    this.customerService.changeIsLogin(true);
                    const loindiv = document.getElementById('logouta') as HTMLElement;
                    loindiv.style.display = 'block';
                    const sin = document.getElementById('signIn') as HTMLElement;
                    sin.style.display = 'none';
                    const sup = document.getElementById('signUp') as HTMLElement;
                    sup.style.display = 'none';
                } else {
                    Swal.fire(
                        'Warning !',
                        'Please check your email !',
                        'info'
                    );
                }
            });
    }

}
