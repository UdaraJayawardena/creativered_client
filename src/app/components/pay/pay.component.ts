import {Component, OnInit} from '@angular/core';
import {ItemServiceService} from '../../services/item-service.service';
import {ShippingAddress, ShippingAddress1} from '../../dto/ShippingAddress';
import {Router} from '@angular/router';
import {ShippingServiceService} from '../../services/shipping-service.service';
import {CustomerServiceService} from '../../services/customer-service.service';
import {CountriesService} from '../../services/countries.service';
import {Countries} from '../../dto/Countries';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
    selector: 'app-pay',
    templateUrl: './pay.component.html',
    styleUrls: ['./pay.component.css']
})
export class PayComponent implements OnInit {

    constructor(private router: Router, private itemService: ItemServiceService, private shippingService: ShippingServiceService,
                private customerService: CustomerServiceService, private countryService: CountriesService,
                private spinner: NgxSpinnerService) {

    }

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

    public shippingFirstNameValue = '';
    public shippingLastNameValue = '';
    public shippingAddressOneValue = '';
    public shippingAddressTwoValue = '';
    public shippingCityValue = '';
    public shippingCountryValue = 'Select country';
    public shippingPostalCodeValue = '';

    public nameRegex = new RegExp('[a-zA-Z\'.\'\\s]{3,}');
    public addressRegex = new RegExp('[a-zA-Z\\/a-zA-Z0-9 \\s\',\']{3,}');
    public postalCodeRegex = new RegExp('');

    public lcdate = '';
    public newdate = '';

    public allCounties: Array<Countries> = [];
    public oldShippingAddress: Array<ShippingAddress1> = [];
    public haveShippingAddress = true;
    public selectOldShippingAddress = false;
    public selectedShippingAddress: ShippingAddress1 = new ShippingAddress1('', '', '', '',
        '', '', '', true, 0, Number(localStorage.getItem('userId')));

    ngOnInit() {
        this.getOldShippingAddress();
        this.getAllCountries();
        this.setAddressDetail();
        this.setEstimateDate();
    }

    public setEstimateDate() {
        const nwdate = new Date();
        this.lcdate = nwdate.toLocaleDateString();
        nwdate.setDate(nwdate.getDate() + 30);
        this.newdate = nwdate.toLocaleDateString();
    }

    public setAddressDetail() {
        if (JSON.parse(localStorage.getItem('isSelectOldShippingAddress')) !== null) {
            if (JSON.parse(localStorage.getItem('isSelectOldShippingAddress'))) {
                const address: ShippingAddress1 = JSON.parse(localStorage.getItem('oldShippingAddress'));
                this.shippingFirstNameValue = address.firstName;
                this.shippingLastNameValue = address.lastName;
                this.shippingAddressOneValue = address.addressOne;
                this.shippingAddressTwoValue = address.addressTwo;
                this.shippingCityValue = address.city;
                this.shippingCountryValue = address.country;
                this.shippingPostalCodeValue = address.postalCode;
            } else {
                const address: ShippingAddress = JSON.parse(localStorage.getItem('newShippingAddress'));
                this.shippingFirstNameValue = address.firstName;
                this.shippingLastNameValue = address.lastName;
                this.shippingAddressOneValue = address.addressOne;
                this.shippingAddressTwoValue = address.addressTwo;
                this.shippingCityValue = address.city;
                this.shippingCountryValue = address.country;
                this.shippingPostalCodeValue = address.postalCode;
            }
        }
    }

    public getAllCountries() {
        this.countryService.getAllCountries()
            .subscribe((result) => {
                this.allCounties = result;
            });
    }

    public getOldShippingAddress() {
        setTimeout(() => this.spinner.show(), 0);
        this.shippingService.getShippingAddressByCustomerId()
            .subscribe((result: Array<ShippingAddress1>) => {
                this.setShippingAddress(result);
            });
    }

    public setShippingAddress(address: Array<ShippingAddress1>) {

        const oldAddress: Array<ShippingAddress1> = [];
        for (let i = 0; i < address.length; i++) {
            if (address[i].status === true) {
                oldAddress.push(address[i]);
            }
        }
        if (oldAddress.length === 0) {
            this.haveShippingAddress = false;
        }
        this.oldShippingAddress = oldAddress;
        setTimeout(() => this.spinner.hide(), 1000);
        if (this.oldShippingAddress.length !== 0) {
            this.shippingFirstNameValue = this.oldShippingAddress[0].firstName;
            this.shippingLastNameValue = this.oldShippingAddress[0].lastName;
            this.shippingAddressOneValue = this.oldShippingAddress[0].addressOne;
            this.shippingAddressTwoValue = this.oldShippingAddress[0].addressTwo;
            this.shippingCityValue = this.oldShippingAddress[0].city;
            this.shippingCountryValue = this.oldShippingAddress[0].country;
            this.shippingPostalCodeValue = this.oldShippingAddress[0].postalCode;

            this.selectOldShippingAddress = true;
            this.selectedShippingAddress = this.oldShippingAddress[0];
        }
    }

    public getSelectedColumnDetail(address: ShippingAddress1) {
        this.selectOldShippingAddress = true;
        this.selectedShippingAddress = address;
        this.shippingFirstNameValue = address.firstName;
        this.shippingLastNameValue = address.lastName;
        this.shippingAddressOneValue = address.addressOne;
        this.shippingAddressTwoValue = address.addressTwo;
        this.shippingCityValue = address.city;
        this.shippingCountryValue = address.country;
        this.shippingPostalCodeValue = address.postalCode;
    }

    public firstNameClick() {
        this.shippingFirstName = false;
        this.shippingFirstNameInput = false;
    }

    public lastNameClick() {
        this.shippingLastName = false;
        this.shippingLastNameInput = false;
    }

    public addressLineOneClick() {
        this.shippingAddressOne = false;
        this.shippingAddressOneInput = false;
    }

    public addressLineTwoClick() {
        this.shippingAddressTwo = false;
        this.shippingAddressTwoInput = false;
    }

    public cityClick() {
        this.shippingCity = false;
        this.shippingCityInput = false;
    }

    public countryClick() {
        this.shippingCountryInput = false;
    }

    public postalCodeClick() {
        this.shippingPostalCode = false;
        this.shippingPostalCodeInput = false;
    }

    public goBillingDetailsPage(firstName, lastName, addressOne, addressTwo, city, country, postalCode) {
        let allOkOne = false;

        if (firstName === '') {
            allOkOne = false;
            this.shippingFirstNameInput = true;
            return;
        } else {
            allOkOne = true;
            this.shippingFirstNameInput = false;
        }
        if (lastName === '') {
            allOkOne = false;
            this.shippingLastNameInput = true;
            return;
        } else {
            allOkOne = true;
            this.shippingLastNameInput = false;
        }
        if (addressOne === '') {
            allOkOne = false;
            this.shippingAddressOneInput = true;
            return;
        } else {
            allOkOne = true;
            this.shippingAddressOneInput = false;
        }
        if (addressTwo === '') {
            allOkOne = false;
            this.shippingAddressTwoInput = true;
            return;
        } else {
            allOkOne = true;
            this.shippingAddressTwoInput = false;
        }
        if (city === '') {
            allOkOne = false;
            this.shippingCityInput = true;
            return;
        } else {
            allOkOne = true;
            this.shippingCityInput = false;
        }
        if (country === 'Select country') {
            allOkOne = false;
            this.shippingCountryInput = true;
            return;
        } else {
            allOkOne = true;
            this.shippingCountryInput = false;
        }
        if (postalCode === '') {
            allOkOne = false;
            this.shippingPostalCodeInput = true;
            return;
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
                return;
            } else {
                this.shippingFirstName = false;
            }
            if (!this.nameRegex.test(lastName)) {
                this.shippingLastName = true;
                allOk = false;
                return;
            } else {
                this.shippingLastName = false;
            }
            if (!this.addressRegex.test(addressOne)) {
                this.shippingAddressOne = true;
                allOk = false;
                return;
            } else {
                this.shippingAddressOne = false;
            }
            if (!this.addressRegex.test(addressTwo)) {
                this.shippingAddressTwo = true;
                allOk = false;
                return;
            } else {
                this.shippingAddressTwo = false;
            }
            if (!this.nameRegex.test(city)) {
                this.shippingCity = true;
                allOk = false;
                return;
            } else {
                this.shippingCity = false;
            }
            if (!this.postalCodeRegex.test(postalCode)) {
                this.shippingPostalCode = true;
                allOk = false;
                return;
            } else {
                this.shippingPostalCode = false;
            }
            if (allOk) {
                if (this.selectOldShippingAddress) {
                    localStorage.removeItem('newShippingAddress');
                    let useOldAddress = true;
                    if (this.selectedShippingAddress.firstName !== firstName) {
                        useOldAddress = false;
                    }
                    if (this.selectedShippingAddress.lastName !== lastName) {
                        useOldAddress = false;
                    }
                    if (this.selectedShippingAddress.addressOne !== addressOne) {
                        useOldAddress = false;
                    }
                    if (this.selectedShippingAddress.addressTwo !== addressTwo) {
                        useOldAddress = false;
                    }
                    if (this.selectedShippingAddress.city !== city) {
                        useOldAddress = false;
                    }
                    if (this.selectedShippingAddress.country !== country) {
                        useOldAddress = false;
                    }
                    if (this.selectedShippingAddress.postalCode !== postalCode) {
                        useOldAddress = false;
                    }
                    const shippingAddress = new ShippingAddress(firstName, lastName, addressOne, addressTwo, city, country,
                        postalCode, true, Number(localStorage.getItem('userId')));
                    if (useOldAddress) {
                        localStorage.setItem('oldShippingAddress', JSON.stringify(this.selectedShippingAddress));
                        localStorage.setItem('isSelectOldShippingAddress', JSON.stringify(true));
                        localStorage.removeItem('newShippingAddress');
                        this.router.navigate(['/money']);
                    } else {
                        localStorage.setItem('newShippingAddress', JSON.stringify(shippingAddress));
                        localStorage.setItem('isSelectOldShippingAddress', JSON.stringify(false));
                        localStorage.removeItem('oldShippingAddress');
                        this.router.navigate(['/money']);
                    }
                } else {
                    const shippingAddress = new ShippingAddress(firstName, lastName, addressOne, addressTwo, city, country,
                        postalCode, true, Number(localStorage.getItem('userId')));
                    localStorage.setItem('newShippingAddress', JSON.stringify(shippingAddress));
                    localStorage.setItem('isSelectOldShippingAddress', JSON.stringify(false));
                    localStorage.removeItem('oldShippingAddress');
                    this.router.navigate(['/money']);
                }
            }
        }
    }
}
