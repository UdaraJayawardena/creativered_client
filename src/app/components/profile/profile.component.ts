import {Component, OnInit} from '@angular/core';
import {BillingAddressServiceService} from '../../services/billing-address-service.service';
import {BillingAddress1, BillingAddress2} from '../../dto/BillingAddress';
import {ShippingAddress, ShippingAddress1} from '../../dto/ShippingAddress';
import {CustomerServiceService} from '../../services/customer-service.service';
import {Customerss, ResetCustomer, UpdateCustomer} from '../../dto/Customer';
import Swal from 'sweetalert2';
import {Complain} from '../../dto/Complain';
import {ComplainServiceService} from '../../services/complain-service.service';
import {ComplainReply} from '../../dto/ComplainReply';
import {CountriesService} from '../../services/countries.service';
import {ShippingServiceService} from '../../services/shipping-service.service';
import {Countries} from '../../dto/Countries';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})


export class ProfileComponent implements OnInit {

    public loggedCusId = localStorage.getItem('userId');
    public billingDetail: BillingAddress2[];
    public shippingDetail: ShippingAddress1[];
    public complainsList: Array<any> = [];

    public firstName;
    public lastName;
    public username = '';
    public realms;
    public idss;
    public email;
    public emailVeri;
    public isSubscribed;
    public isReply = false;
    public haveMessage = true;
    public haveBillingAddress = true;
    public haveShippingAddres = true;
    public allCounties: Array<Countries> = [];

    public complaint: any = [];
    public reply: ComplainReply = new ComplainReply('', '', '', 0, 0, 0);
    public addNewSAddress = true;
    public addNewBAddress = true;

    public nameRegex = new RegExp('[a-zA-Z\'.\'\\s]{3,}');
    public addressRegex = new RegExp('[a-zA-Z\\/a-zA-Z0-9 \\s\',\']{3,}');
    public postalCodeRegex = new RegExp('');

    public shippingFirstName = false;
    public shippingLastName = false;
    public shippingAddressOne = false;
    public shippingAddressTwo = false;
    public shippingCity = false;
    public shippingPostalCode = false;

    public shippingFirstNameInput = false;
    public shippingLastNameInput = false;
    public shippingAddressOneInput = false;
    public shippingAddressTwoInput = false;
    public shippingCityInput = false;
    public shippingCountryInput = false;
    public shippingPostalCodeInput = false;

    public billingFirstName = false;
    public billingLastName = false;
    public billingAddressOne = false;
    public billingAddressTwo = false;
    public billingCity = false;
    public billingPostalCode = false;

    public billingFirstNameInput = false;
    public billingLastNameInput = false;
    public billingAddressOneInput = false;
    public billingAddressTwoInput = false;
    public billingCityInput = false;
    public billingCountryInput = false;
    public billingPostalCodeInput = false;

    constructor(private billing: BillingAddressServiceService, private customerService: CustomerServiceService,
                private complainService: ComplainServiceService, private countryService: CountriesService,
                private shippingService: ShippingServiceService) {
    }

    ngOnInit() {
        this.getBiilingDetails();
        this.getShippingDetails();
        this.setCustomerDetails();
        this.getOrdersByCustomerId();
        this.getAllCountries();
    }

    public getAllCountries() {
        this.countryService.getAllCountries()
            .subscribe((result) => {
                this.allCounties = result;
            });
    }

    changeSubscribe() {
        if (this.isSubscribed === true) {
            this.isSubscribed = false;
        } else {
            this.isSubscribed = true;
        }
    }

    public getReplyForComplain(complainId) {
        this.complainService.getComplainReplyById(complainId)
            .subscribe((result) => {
                if (result.length === 1) {
                    this.reply = result[0];
                } else {
                    this.reply = new ComplainReply('', '', '', 0, 0, 0);
                }
            });
    }

    public writeReply() {
        this.isReply = true;
    }

    public sendReply(message) {
        if (message !== '') {
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().toTimeString().split(' ')[0];
            const complain = new Complain(date, time, message, 'false', this.complaint.complainTypeId, this.complaint.orderId);
            this.complainService.addComplain(complain)
                .subscribe((result) => {
                    this.complaint = [];
                    this.complainsList = [];
                    this.getOrdersByCustomerId();
                    Swal.fire('send successfully !');
                });
            this.isReply = false;
        } else {
            Swal.fire('enter reply message');
        }
    }

    public setComplain(complain) {
        this.complaint = complain;
        this.getReplyForComplain(complain.id);
    }

    getBiilingDetails() {
        this.billing.getLoggedBillings()
            .subscribe((result) => {
                this.billingDetail = result;
                this.setBillingDetails();
            });
    }

    getShippingDetails() {
        this.billing.getLoggedShippings()
            .subscribe((result) => {
                this.shippingDetail = result;
                this.setShippingDetails();
            });
    }

    setBillingDetails() {
        const objs = [];
        for (let i = 0; i < this.billingDetail.length; i++) {
            if (this.billingDetail[i].customerBillingId.toString() === this.loggedCusId) {
                if (this.billingDetail[i].status === true) {
                    this.haveBillingAddress = true;
                    objs.push(new BillingAddress2(this.billingDetail[i].firstName, this.billingDetail[i].lastName,
                        this.billingDetail[i].addressOne, this.billingDetail[i].addressTwo, this.billingDetail[i].city,
                        this.billingDetail[i].country, this.billingDetail[i].postalCode, this.billingDetail[i].status,
                        this.billingDetail[i].id, this.billingDetail[i].customerBillingId));
                }
            } else {
                this.haveBillingAddress = false;
            }
        }
        this.billingDetail = objs;
    }

    setShippingDetails() {
        const obj = [];
        for (let i = 0; i < this.shippingDetail.length; i++) {
            if (this.shippingDetail[i].customerShippingId.toString() === this.loggedCusId) {
                if (this.shippingDetail[i].status === true) {
                    this.haveShippingAddres = true;
                    obj.push(new ShippingAddress1(this.shippingDetail[i].firstName, this.shippingDetail[i].lastName,
                        this.shippingDetail[i].addressOne, this.shippingDetail[i].addressTwo, this.shippingDetail[i].city,
                        this.shippingDetail[i].country, this.shippingDetail[i].postalCode, this.shippingDetail[i].status,
                        this.shippingDetail[i].id, this.shippingDetail[i].customerShippingId));
                }
            } else {
                this.haveShippingAddres = false;
            }
        }
        this.shippingDetail = obj;
    }

    setCustomerDetails() {
        this.customerService.getCustomerDetails(localStorage.getItem('userId'))
            .subscribe((result: Customerss) => {
                this.firstName = result.firstName;
                this.lastName = result.lastName;
                this.realms = result.realm;
                this.idss = result.id;
                this.username = result.username;
                this.email = result.email;
                this.emailVeri = result.emailVerified;
                this.isSubscribed = result.subscribe;
            });
    }

    updateBillingDetails(fname, lname, adOne, adTwo, city, country, postal, bill: BillingAddress2) {
        if (fname === '' || lname === '' || adOne === '' || adTwo === '' || city === '' || country === '' || postal === '') {
            Swal.fire('Fill the fields !');
        } else {
            const billObj = new BillingAddress2(fname, lname, adOne, adTwo, city, country, postal, true, bill.id,
                bill.customerBillingId);
            this.billing.updateBillingAddress(billObj)
                .subscribe((result) => {
                    Swal.fire('Billing Details have updated !');
                    this.getBiilingDetails();
                });
        }
    }


    updateCustomer(first, last, username, password) {
        if (first === '' || last === '' || username === '' || password === '') {
            Swal.fire('Fill the fields !');
        } else {
            this.checkPassword(first, last, username, password);
        }
    }

    checkPassword(first, last, username, password) {
        const cus = new ResetCustomer(password, password);
        this.customerService.changePassword(cus)
            .subscribe((result) => {
                    this.updating(first, last, username, password);
                }, (error1 => {
                    Swal.fire('Password is incorrect !');
                })
            );
    }

    resetPassword(current, newP, newTwoP) {
        if (current === '' || newP === '' || newTwoP === '') {
            Swal.fire('Fill the fields !');
        } else {
            if (newP !== newTwoP) {
                Swal.fire('Passwords doesn`t match !');
            } else {
                const cus = new ResetCustomer(current, newP);
                this.customerService.changePassword(cus)
                    .subscribe((result) => {
                            Swal.fire('Password successfully changed !');
                        }, (error1 => {
                            Swal.fire('Current password is incorrect !');
                        })
                    );
            }
        }
    }

    updating(first, last, username, password) {
        const cusObj = new UpdateCustomer(first, last, this.isSubscribed, this.realms, username, this.email, password,
            this.emailVeri, this.idss);
        this.customerService.updateCustomer(cusObj)
            .subscribe((result) => {
                Swal.fire('your detail is successfully changed');
                this.setCustomerDetails();
            });
    }

    getOrdersByCustomerId() {
        this.customerService.getCustomerOrdersByCustomerId()
            .subscribe((result) => {
                if (result.length === 0) {
                    this.haveMessage = false;
                }
                for (let i = 0; i < result.length; i++) {
                    this.getComplainsByOrderId(result[i].id);
                }
            });
    }

    getComplainsByOrderId(orderId) {
        this.customerService.getComplainsByOrderId(orderId)
            .subscribe((result) => {
                if (result.length === 0) {
                    this.haveMessage = false;
                }
                for (let i = 0; i < result.length; i++) {
                    this.complainService.getComplainTypeByID(result[i].complainTypeID)
                        .subscribe((result1) => {
                            this.complainsList.push({
                                'date': result[i].comDate,
                                'time': result[i].comTime,
                                'message': result[i].message,
                                'status': result[i].status,
                                'complain': result1.complainType,
                                'orderId': result[i].complainOrderId,
                                'id': result[i].id,
                                'complainTypeId': result[i].complainTypeID
                            });

                        });
                }
            });
    }

    public removeBillingAddress(address: BillingAddress2) {
        Swal.fire({
            title: '',
            text: 'are you want to remove the shipping address ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                address.status = false;
                this.billing.updateBillingAddress(address)
                    .subscribe((result1) => {
                        Swal.fire('address removed success !');
                        this.getBiilingDetails();
                    });
            }
        });
    }

    public removeShippingAddress(address: ShippingAddress1) {
        Swal.fire({
            title: '',
            text: 'are you want to remove the shipping address ?',
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.value) {
                address.status = false;
                this.shippingService.updateShippingAddress(address)
                    .subscribe((result1) => {
                        Swal.fire('address removed success !');
                        this.getShippingDetails();
                    });
            }
        });
    }

    public addNewShippingAddress() {
        this.addNewSAddress = false;
    }

    public saveNewShippingAddress(firstName, lastName, addressOne, addressTwo, city, country, postalCode) {
        let allOkOne = true;

        if (firstName === '') {
            allOkOne = false;
            this.shippingFirstNameInput = true;
        } else {
            allOkOne = true;
            this.shippingFirstNameInput = false;
        }
        if (lastName === '') {
            allOkOne = false;
            this.shippingLastNameInput = true;
        } else {
            allOkOne = true;
            this.shippingLastNameInput = false;
        }
        if (addressOne === '') {
            allOkOne = false;
            this.shippingAddressOneInput = true;
        } else {
            allOkOne = true;
            this.shippingAddressOneInput = false;
        }
        if (addressTwo === '') {
            allOkOne = false;
            this.shippingAddressTwoInput = true;
        } else {
            allOkOne = true;
            this.shippingAddressTwoInput = false;
        }
        if (city === '') {
            allOkOne = false;
            this.shippingCityInput = true;
        } else {
            allOkOne = true;
            this.shippingCityInput = false;
        }
        if (country === 'select country') {
            allOkOne = false;
            this.shippingCountryInput = true;
        } else {
            allOkOne = true;
            this.shippingCountryInput = false;
        }
        if (postalCode === '') {
            allOkOne = false;
            this.shippingPostalCodeInput = true;
        } else {
            allOkOne = true;
            this.shippingPostalCodeInput = false;
        }

        if (allOkOne) {
            let allOk = true;
            for (let i = 0; i < this.allCounties.length; i++) {
                if (this.allCounties[i].Country === country) {
                    this.postalCodeRegex = new RegExp(this.allCounties[i].Regex);
                }
            }
            if (!this.nameRegex.test(firstName)) {
                this.shippingFirstName = true;
                allOk = false;
            } else {
                this.shippingFirstName = false;
            }
            if (!this.nameRegex.test(lastName)) {
                this.shippingLastName = true;
                allOk = false;
            } else {
                this.shippingLastName = false;
            }
            if (!this.addressRegex.test(addressOne)) {
                this.shippingAddressOne = true;
                allOk = false;
            } else {
                this.shippingAddressOne = false;
            }
            if (!this.addressRegex.test(addressTwo)) {
                this.shippingAddressTwo = true;
                allOk = false;
            } else {
                this.shippingAddressTwo = false;
            }
            if (!this.nameRegex.test(city)) {
                this.shippingCity = true;
                allOk = false;
            } else {
                this.shippingCity = false;
            }
            if (!this.postalCodeRegex.test(postalCode)) {
                this.shippingPostalCode = true;
                allOk = false;
            } else {
                this.shippingPostalCode = false;
            }
            if (allOk) {
                const shippingAddress = new ShippingAddress(firstName, lastName, addressOne, addressTwo, city, country, postalCode,
                    true, Number(localStorage.getItem('userId')));
                this.shippingService.saveShippingAddress(shippingAddress)
                    .subscribe((result) => {
                        Swal.fire('new shipping address added successfully !');
                        this.getShippingDetails();
                        this.addNewSAddress = true;
                    });
            }
        }
    }

    public addNewBillingAddress() {
        this.addNewBAddress = false;
    }

    public saveNewBillingAddress(firstName, lastName, addressOne, addressTwo, city, country, postalCode) {
        let allOkOne = true;

        if (firstName === '') {
            allOkOne = false;
            this.billingFirstNameInput = true;
        } else {
            this.billingFirstNameInput = false;
        }
        if (lastName === '') {
            allOkOne = false;
            this.billingLastNameInput = true;
        } else {
            this.billingLastNameInput = false;
        }
        if (addressOne === '') {
            allOkOne = false;
            this.billingAddressOneInput = true;
        } else {
            this.billingAddressOneInput = false;
        }
        if (addressTwo === '') {
            allOkOne = false;
            this.billingAddressTwoInput = true;
        } else {
            this.billingAddressTwoInput = false;
        }
        if (city === '') {
            allOkOne = false;
            this.billingCityInput = true;
        } else {
            this.billingCityInput = false;
        }
        if (country === 'select country') {
            allOkOne = false;
            this.billingCountryInput = true;
        } else {
            this.billingCountryInput = false;
        }
        if (postalCode === '') {
            allOkOne = false;
            this.billingPostalCodeInput = true;
        } else {
            this.billingPostalCodeInput = false;
        }

        if (allOkOne) {
            let allOk = true;
            for (let i = 0; i < this.allCounties.length; i++) {
                if (this.allCounties[i].Country === country) {
                    this.postalCodeRegex = new RegExp(this.allCounties[i].Regex);
                }
            }
            if (!this.nameRegex.test(firstName)) {
                this.billingFirstName = true;
                allOk = false;
            } else {
                this.billingFirstName = false;
            }
            if (!this.nameRegex.test(lastName)) {
                this.billingLastName = true;
                allOk = false;
            } else {
                this.billingLastName = false;
            }
            if (!this.addressRegex.test(addressOne)) {
                this.billingAddressOne = true;
                allOk = false;
            } else {
                this.billingAddressOne = false;
            }
            if (!this.addressRegex.test(addressTwo)) {
                this.billingAddressTwo = true;
                allOk = false;
            } else {
                this.billingAddressTwo = false;
            }
            if (!this.nameRegex.test(city)) {
                this.billingCity = true;
                allOk = false;
            } else {
                this.billingCity = false;
            }
            if (!this.postalCodeRegex.test(postalCode)) {
                this.billingPostalCode = true;
                allOk = false;
            } else {
                this.billingPostalCode = false;
            }
            if (allOk) {
                const billingAddress = new BillingAddress1(firstName, lastName, addressOne, addressTwo, city, country, postalCode,
                    true, Number(localStorage.getItem('userId')));

                this.billing.saveNewAddress(billingAddress)
                    .subscribe((result) => {
                        Swal.fire('new billing address added successfully !');
                        this.getBiilingDetails();
                        this.addNewBAddress = true;
                    });
            }
        }
    }
}
