import {Component, OnInit} from '@angular/core';
import {ItemServiceService} from '../../services/item-service.service';
import {BillingAddress1, BillingAddress2} from '../../dto/BillingAddress';
import {BillingAddressServiceService} from '../../services/billing-address-service.service';
import {MoneyServiceService} from '../../services/money-service.service';
import {PaymentServiceService} from '../../services/payment-service.service';
import {Router} from '@angular/router';
import {CountriesService} from '../../services/countries.service';
import {Countries} from '../../dto/Countries';
import {ShippingAddress, ShippingAddress1} from '../../dto/ShippingAddress';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-money',
    templateUrl: './money.component.html',
    styleUrls: ['./money.component.css']
})
export class MoneyComponent implements OnInit {

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

    public billingFirstNameValue = '';
    public billingLastNameValue = '';
    public billingAddressOneValue = '';
    public billingAddressTwoValue = '';
    public billingCityValue = '';
    public billingCountryValue = 'Select country';
    public billingPostalCodeValue = '';

    public nameRegex = new RegExp('[a-zA-Z\'.\'\\s]{3,}');
    public addressRegex = new RegExp('[a-zA-Z\\/a-zA-Z0-9 \\s\',\']{3,}');
    public postalCodeRegex = new RegExp('');

    public allCounties: Array<Countries> = [];
    public oldBillingAddress: Array<BillingAddress2> = [];
    public haveBillingAddress = false;
    public selectOldBillingAddress = false;
    public selectedBillingAddress = new BillingAddress2('', '', '', '', '', '',
        '', true, 0, Number(localStorage.getItem('userId')));

    constructor(private moneyservice: MoneyServiceService, private billingAddressService: BillingAddressServiceService,
                private itemservice: ItemServiceService, private paymentService: PaymentServiceService, private router: Router,
                private countryService: CountriesService, private spinner: NgxSpinnerService) {
    }

    ngOnInit() {
        this.getOldBillingAddress();
        this.getAllCountries();
        this.setAddressDetail();
    }

    public firstNameClick() {
        this.billingFirstName = false;
        this.billingFirstNameInput = false;
    }

    public lastNameClick() {
        this.billingLastName = false;
        this.billingLastNameInput = false;
    }

    public addressOneClick() {
        this.billingAddressOne = false;
        this.billingAddressOneInput = false;
    }

    public addressTwoClick() {
        this.billingAddressTwo = false;
        this.billingAddressTwoInput = false;
    }

    public cityClick() {
        this.billingCity = false;
        this.billingCityInput = false;
    }

    public countryClick() {
        this.billingCountryInput = false;
    }

    public postalCodeClick() {
        this.billingPostalCode = false;
        this.billingPostalCodeInput = false;
    }

    public setAddressDetail() {
        if (JSON.parse(localStorage.getItem('isSelectOldBillingAddress')) !== null) {
            if (JSON.parse(localStorage.getItem('isSelectOldBillingAddress'))) {
                const address: ShippingAddress1 = JSON.parse(localStorage.getItem('oldBillingAddress'));
                this.billingFirstNameValue = address.firstName;
                this.billingLastNameValue = address.lastName;
                this.billingAddressOneValue = address.addressOne;
                this.billingAddressTwoValue = address.addressTwo;
                this.billingCityValue = address.city;
                this.billingCountryValue = address.country;
                this.billingPostalCodeValue = address.postalCode;
            } else {
                const address: ShippingAddress = JSON.parse(localStorage.getItem('newBillingAddress'));
                this.billingFirstNameValue = address.firstName;
                this.billingLastNameValue = address.lastName;
                this.billingAddressOneValue = address.addressOne;
                this.billingAddressTwoValue = address.addressTwo;
                this.billingCityValue = address.city;
                this.billingCountryValue = address.country;
                this.billingPostalCodeValue = address.postalCode;
            }
        }
    }

    public getAllCountries() {
        this.countryService.getAllCountries()
            .subscribe((result) => {
                this.allCounties = result;
            });
    }

    public getOldBillingAddress() {
        setTimeout(() => this.spinner.show(), 0);
        this.billingAddressService.getBillingAddressByCustomerId()
            .subscribe((result) => {
                this.setBillingAddress(result);
            });
    }

    public setBillingAddress(address: Array<BillingAddress2>) {
        const billingAddress: Array<BillingAddress2> = [];
        for (let i = 0; i < address.length; i++) {
            if (address[i].status === true) {
                billingAddress.push(address[i]);
                this.haveBillingAddress = true;
            }
        }
        this.oldBillingAddress = billingAddress;
        setTimeout(() => this.spinner.hide(), 1000);
        if (this.oldBillingAddress.length !== 0) {
            this.billingFirstNameValue = this.oldBillingAddress[0].firstName;
            this.billingLastNameValue = this.oldBillingAddress[0].lastName;
            this.billingAddressOneValue = this.oldBillingAddress[0].addressOne;
            this.billingAddressTwoValue = this.oldBillingAddress[0].addressTwo;
            this.billingCityValue = this.oldBillingAddress[0].city;
            this.billingCountryValue = this.oldBillingAddress[0].country;
            this.billingPostalCodeValue = this.oldBillingAddress[0].postalCode;

            this.selectOldBillingAddress = true;
            this.selectedBillingAddress = address[0];
        }
    }

    public getSelectedColumnDetail(address: BillingAddress2) {
        this.selectOldBillingAddress = true;
        this.selectedBillingAddress = address;
        this.billingFirstNameValue = address.firstName;
        this.billingLastNameValue = address.lastName;
        this.billingAddressOneValue = address.addressOne;
        this.billingAddressTwoValue = address.addressTwo;
        this.billingCityValue = address.city;
        this.billingCountryValue = address.country;
        this.billingPostalCodeValue = address.postalCode;
    }

    public goPaymentDetailsPage(firstName, lastName, addressOne, addressTwo, city, country, postalCode) {
        let allOkOne = false;

        if (firstName === '') {
            allOkOne = false;
            this.billingFirstNameInput = true;
            return;
        } else {
            allOkOne = true;
            this.billingFirstNameInput = false;
        }
        if (lastName === '') {
            allOkOne = false;
            this.billingLastNameInput = true;
            return;
        } else {
            allOkOne = true;
            this.billingLastNameInput = false;
        }
        if (addressOne === '') {
            allOkOne = false;
            this.billingAddressOneInput = true;
            return;
        } else {
            allOkOne = true;
            this.billingAddressOneInput = false;
        }
        if (addressTwo === '') {
            allOkOne = false;
            this.billingAddressTwoInput = true;
            return;
        } else {
            allOkOne = true;
            this.billingAddressTwoInput = false;
        }
        if (city === '') {
            allOkOne = false;
            this.billingCityInput = true;
            return;
        } else {
            allOkOne = true;
            this.billingCityInput = false;
        }
        if (country === 'select country') {
            allOkOne = false;
            this.billingCountryInput = true;
            return;
        } else {
            allOkOne = true;
            this.billingCountryInput = false;
        }
        if (postalCode === '') {
            allOkOne = false;
            this.billingPostalCodeInput = true;
            return;
        } else {
            allOkOne = true;
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
                if (this.selectOldBillingAddress) {
                    localStorage.removeItem('newBillingAddress');
                    let useOldAddress = true;
                    if (this.selectedBillingAddress.firstName !== firstName) {
                        useOldAddress = false;
                    }
                    if (this.selectedBillingAddress.lastName !== lastName) {
                        useOldAddress = false;
                    }
                    if (this.selectedBillingAddress.addressOne !== addressOne) {
                        useOldAddress = false;
                    }
                    if (this.selectedBillingAddress.addressTwo !== addressTwo) {
                        useOldAddress = false;
                    }
                    if (this.selectedBillingAddress.city !== city) {
                        useOldAddress = false;
                    }
                    if (this.selectedBillingAddress.country !== country) {
                        useOldAddress = false;
                    }
                    if (this.selectedBillingAddress.postalCode !== postalCode) {
                        useOldAddress = false;
                    }
                    const billingAddress = new BillingAddress1(firstName, lastName, addressOne, addressTwo, city, country,
                        postalCode, true, Number(localStorage.getItem('userId')));
                    if (useOldAddress) {
                        localStorage.setItem('oldBillingAddress', JSON.stringify(this.selectedBillingAddress));
                        localStorage.setItem('isSelectOldBillingAddress', JSON.stringify(true));
                        localStorage.removeItem('newBillingAddress');
                        this.router.navigate(['/payment']);
                    } else {
                        localStorage.setItem('newBillingAddress', JSON.stringify(billingAddress));
                        localStorage.setItem('isSelectOldBillingAddress', JSON.stringify(false));
                        localStorage.removeItem('oldBillingAddress');
                        this.router.navigate(['/payment']);
                    }
                } else {
                    const billingAddress = new BillingAddress1(firstName, lastName, addressOne, addressTwo, city, country,
                        postalCode, true, Number(localStorage.getItem('userId')));
                    localStorage.setItem('newBillingAddress', JSON.stringify(billingAddress));
                    localStorage.setItem('isSelectOldBillingAddress', JSON.stringify(false));
                    localStorage.removeItem('oldBillingAddress');
                    this.router.navigate(['/payment']);
                }
            }
        }
    }
}
