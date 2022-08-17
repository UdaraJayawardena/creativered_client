import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CustomerServiceService} from '../../services/customer-service.service';
import {Customer1, Customer2, Customers} from '../../dto/Customer';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
    @ViewChild('closeModal') closeModal: ElementRef;

    public isSubscribe = true;

    public userNameValue;
    public wrongUserName = false;
    public userNameInput = false;

    public emailValue;
    public wrongEmail = false;
    public emailInput = false;

    public passwordValue;
    public wrongPassword = false;
    public passwordInput = false;

    public confirmPasswordValue;
    public wrongConfirmPassword = false;
    public confirmPasswordinput = false;

    public isSignUpModalClose;

    public userNameRegex = new RegExp('[a-zA-Z\'_\'\'.\' 0-9]{3,}');
    public emailRegex = new RegExp('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$');
    public passwordRegex = new RegExp('^[a-zA-Z0-9]{8,14}$');

    constructor(private customerService: CustomerServiceService, private router: Router) {
    }

    ngOnInit() {
    }

    public userNameClick() {
        this.userNameInput = false;
        this.wrongUserName = false;
    }

    public emailClick() {
        this.emailInput = false;
        this.wrongEmail = false;
    }

    public passwordClick() {
        this.passwordInput = false;
        this.wrongPassword = false;
    }

    public confirmPasswrodClick() {
        this.confirmPasswordinput = false;
        this.wrongConfirmPassword = false;
    }

    public verifyEmail(id) {
        const cusid = new Customer2(id);
        this.customerService.verifyEmail(id)
            .subscribe((result) => {
                this.closeModal.nativeElement.click();
                this.router.navigate(['/home']);
                Swal.fire(
                    '',
                    'go your e-mail & verify account...',
                    'info'
                );
            }, (error => {
                Swal.fire(
                    'Warning !',
                    'Fail...!',
                    'error'
                );
            }));
    }

    subscribeUpdate(value) {
        this.isSubscribe = value.currentTarget.checked.toString();
    }

    saveCustomer(userName, email, password, confirmPassword) {
        let ok = false;
        let allOk = false;
        if (userName === '') {
            this.userNameInput = true;
            ok = false;
        } else {
            this.userNameInput = false;
            ok = true;
        }

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

        if (confirmPassword === '') {
            this.confirmPasswordinput = true;
            ok = false;
        } else {
            this.confirmPasswordinput = false;
            ok = true;
        }

        if (ok) {

            if (this.userNameRegex.test(userName)) {
                this.wrongUserName = false;
                allOk = true;
            } else {
                this.wrongUserName = true;
                allOk = false;
                return;
            }

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

            if (this.passwordRegex.test(confirmPassword)) {
                this.wrongConfirmPassword = false;
                allOk = true;
            } else {
                this.wrongConfirmPassword = true;
                allOk = false;
                return;
            }
            if (allOk) {
                if (password === confirmPassword) {
                    const cusobj = new Customer1(userName, userName, this.isSubscribe, userName, email, password);
                    this.customerService.addCustomer(cusobj)
                        .subscribe((result: Customers) => {
                            this.isSignUpModalClose = true;
                            Swal.fire(
                                'Success !',
                                'Signed up',
                                'success'
                            );
                        }, (error1 => {
                                Swal.fire(
                                    'Warning !',
                                    'Email is already used.',
                                    'error'
                                );
                            })
                        );
                    console.log(cusobj)
                } else {
                    Swal.fire('password does not  match! please check again.');
                }
            }

        }
    }

}
