import { Component, OnInit } from '@angular/core';
import { PaymentServiceService } from '../../services/payment-service.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { ItemServiceService } from '../../services/item-service.service';
import { ShippingServiceService } from '../../services/shipping-service.service';
import { BillingAddressServiceService } from '../../services/billing-address-service.service';
import { MoneyServiceService } from '../../services/money-service.service';
import { MailServiceService } from '../../services/mail-service.service';
import { Router } from '@angular/router';
import { CartItem } from '../../dto/CartItem';
import { Orders, Orders1, Orders2 } from '../../dto/Orders';
import { OrderDetail } from '../../dto/OrderDetail';
import { Items } from '../../dto/Items';
import { CartServiceService } from '../../services/cart-service.service';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
    selector: 'app-stripe-paypal',
    templateUrl: './stripe-paypal.component.html',
    styleUrls: ['./stripe-paypal.component.css']
})

// class item {
//     itemId: number;
//     name: string;
//     age: number;

//     constructor(id: number, name: string, age: number) {
//       this.id = id;
//       this.name = name;
//       this.age = age;
//     }
// }
export class StripePaypalComponent implements OnInit {

    public tot = 0;
    public realTot = 0;
    public _self: any;

    public paymentID = '';

    public itemList: Array<CartItem> = [];

    public bFirstName = '';
    public bLsatName = '';
    public bAddressLine1 = '';
    public bAddressLine2 = '';
    public bCity = '';
    public bCountry = '';
    public bPostalCode = 0;

    public sFirstName = '';
    public sLsatName = '';
    public sAddressLine1 = '';
    public sAddressLine2 = '';
    public sCity = '';
    public sCountry = '';
    public sPostalCode = '';
    public paymentType = '';
    public billingId = 0;
    public shippingId = 0;

    public cardInput = false;
    public wrongCard = false;

    public monthInput = false;
    public wrongMonth = false;

    public yearInput = false;
    public wrongYear = false;

    public cvvInput = false;
    public wrongCvv = false;

    // public cardRegex = new RegExp('^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]' +
    //     '{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})LKR');
    public monthRegex = new RegExp('^(0?[1-9]|1[012])LKR');
    public yearRegex = new RegExp('^\\d{4}LKR');
    public cvcRegex = new RegExp('^[0-9]{3,4}LKR');

    openCheckout(cardno, month, year, cvc) {
        console.log(cardno);
        console.log(month);
        console.log(year);
        console.log(cvc);
        let ok = false;
        let allOk = false;
        if (cardno === '') {
            ok = false;
            this.cardInput = true;
            return;
        } else {
            ok = true;
            this.cardInput = false;
        }

        if (month === '') {
            ok = false;
            this.monthInput = true;
            return;
        } else {
            ok = true;
            this.monthInput = false;
        }

        if (year === '') {
            ok = false;
            this.yearInput = true;
            return;
        } else {
            ok = true;
            this.yearInput = false;
        }

        if (cvc === '') {
            ok = false;
            this.cvvInput = true;
            return;
        } else {
            ok = true;
            this.cvvInput = false;
        }

        if (ok) {
            if (!(cardno)) {
                allOk = false;
                this.wrongCard = true;
            } else {
                allOk = true;
                this.wrongCard = false;
            }

            if (!this.monthRegex.test(month)) {
                allOk = false;
                this.wrongMonth = true;
            } else {
                allOk = true;
                this.wrongMonth = false;
            }

            if (!this.yearRegex.test(year)) {
                allOk = false;
                this.wrongYear = true;
            } else {
                allOk = true;
                this.wrongYear = false;
            }

            if (!this.cvcRegex.test(cvc)) {
                allOk = false;
                this.wrongCvv = true;
            } else {
                allOk = true;
                this.wrongCvv = false;
            }

            console.log(this.cardInput);
            console.log(this.monthInput);
            console.log(this.yearInput);
            console.log(this.cvvInput);

            console.log(this.wrongCard);
            console.log(this.wrongMonth);
            console.log(this.wrongYear);
            console.log(this.wrongCvv);

            if (allOk) {
                setTimeout(() => this.spinner.show(), 0);
                this.paymentType = 'card payment';
                this.plaseOrder();
                localStorage.setItem('paymentType', 'card');
                // (window as any).Stripe.card.createToken({
                //     number: cardno,
                //     exp_month: month,
                //     exp_year: year,
                //     cvc: cvc
                // }, (status: number, response: any) => {
                //     console.log(status);
                //     if (status === 200) {
                //         const token = response.id;
                //         console.log(token);
                //         // this.chargeCard(token);
                //     } else {
                //         setTimeout(() => this.spinner.hide(), 500);
                //         Swal.fire('payment fail. try again !');
                //     }
                // });
            } else {
                Swal.fire('payment fail. try again !');
            }
        }
    }

    chargeCard(token: string) {
        this.http.post('http://3.17.162.128:3000/charge', {
            stripeToken: token, stripeEmail: localStorage.getItem('userEmail'), amount: this.tot, type: 'stripe'
        })
            .subscribe((result) => {
                console.log(result);
                const x = JSON.stringify(result);
                this.paymentID = JSON.parse(x).customer;
                if (this.paymentID !== '') {
                    this.plaseOrder();
                }
            });
    }

    constructor(private paymentService: PaymentServiceService, private http: HttpClient, private itemService: ItemServiceService,
        private shippingService: ShippingServiceService, private billingService: BillingAddressServiceService,
        private moneyService: MoneyServiceService, private mailService: MailServiceService,
        private router: Router, private cartService: CartServiceService, private spinner: NgxSpinnerService) {
    }

    ngOnInit(): void {
        this._self = this;
        this.loadItemList();
        this.setBillingShippingIds();
        this.setBillingAndShippingAddress();
    }

    paypalPayment() {
        this.paymentType = 'paypal';
        this.http.post('http://ec2-3-111-113-150.ap-south-1.compute.amazonaws.com:3000/buy', { amount: this.tot }).subscribe((result) => {
            const x = JSON.stringify(result);
            this.getPaymentId(JSON.parse(x).url);
        });
    }

    getPaymentId(urleka) {
        window.open(urleka);
        this.http.get(urleka).subscribe((result1) => {
            const y = JSON.stringify(result1);
            this.paymentID = JSON.parse(y).paymentId;
            if (this.paymentID !== '') {
                this.plaseOrder();
            }
        });
    }

    public order() {
        if (this.paymentID !== '') {
        }
    }

    public setBillingAndShippingAddress() {
        setTimeout(() => this.spinner.show(), 0);
        if (JSON.parse(localStorage.getItem('isSelectOldBillingAddress')) === true) {
            const billingAddress = JSON.parse(localStorage.getItem('oldBillingAddress'));
            this.bFirstName = billingAddress.firstName;
            this.bLsatName = billingAddress.lastName;
            this.bAddressLine1 = billingAddress.addressOne;
            this.bAddressLine2 = billingAddress.addressTwo;
            this.bCity = billingAddress.city;
            this.bCountry = billingAddress.country;
            this.bPostalCode = billingAddress.postalCode;
            setTimeout(() => this.spinner.hide(), 1000);
        } else {
            const billingAddress = JSON.parse(localStorage.getItem('newBillingAddress'));
            this.bFirstName = billingAddress.firstName;
            this.bLsatName = billingAddress.lastName;
            this.bAddressLine1 = billingAddress.addressOne;
            this.bAddressLine2 = billingAddress.addressTwo;
            this.bCity = billingAddress.city;
            this.bCountry = billingAddress.country;
            this.bPostalCode = billingAddress.postalCode;
            setTimeout(() => this.spinner.hide(), 1000);
        }

        if (JSON.parse(localStorage.getItem('isSelectOldShippingAddress')) === true) {
            const shippingAddress = JSON.parse(localStorage.getItem('oldShippingAddress'));
            this.sFirstName = shippingAddress.firstName;
            this.sLsatName = shippingAddress.lastName;
            this.sAddressLine1 = shippingAddress.addressOne;
            this.sAddressLine2 = shippingAddress.addressTwo;
            this.sCity = shippingAddress.city;
            this.sCountry = shippingAddress.country;
            this.sPostalCode = shippingAddress.postalCode;
            setTimeout(() => this.spinner.hide(), 1000);
        } else {
            const shippingAddress = JSON.parse(localStorage.getItem('newShippingAddress'));
            this.sFirstName = shippingAddress.firstName;
            this.sLsatName = shippingAddress.lastName;
            this.sAddressLine1 = shippingAddress.addressOne;
            this.sAddressLine2 = shippingAddress.addressTwo;
            this.sCity = shippingAddress.city;
            this.sCountry = shippingAddress.country;
            this.sPostalCode = shippingAddress.postalCode;
            setTimeout(() => this.spinner.hide(), 1000);
        }
    }

    public loadItemList() {
        setTimeout(() => this.spinner.show(), 0);
        const cartItem: Array<CartItem> = JSON.parse(localStorage.getItem('cartItemList'));
        this.itemList = cartItem;
        for (let i = 0; i < cartItem.length; i++) {
            this.tot += (cartItem[i].price * cartItem[i].cartQty);
            this.realTot += (cartItem[i].price * cartItem[i].cartQty);
        }
        setTimeout(() => this.spinner.hide(), 1000);
    }

    public setBillingShippingIds() {

    }

    public plaseOrder() {
        // if (this.paymentID !== '') {
        if (JSON.parse(localStorage.getItem('isSelectOldShippingAddress')) === true) {
            this.shippingId = JSON.parse(localStorage.getItem('oldShippingAddress')).id;
        } else {

            const newShippingAddress = JSON.parse(localStorage.getItem('newShippingAddress'));
            this.shippingService.saveShippingAddress(newShippingAddress)
                .subscribe((result) => {
                    this.shippingId = result.id;
                });
        }
        if (JSON.parse(localStorage.getItem('isSelectOldBillingAddress')) === true) {
            this.billingId = JSON.parse(localStorage.getItem('oldBillingAddress')).id;

        } else {
            const newBillingAddress = JSON.parse(localStorage.getItem('newBillingAddress'));
            this.billingService.saveNewAddress(newBillingAddress)
                .subscribe((result) => {
                    this.billingId = result.id;
                });
        }
        setTimeout(() => this.addOrderTwo(), 5000);
        // }
    }

    public addOrderTwo() {
        let allOk = true;
        const date = new Date().toISOString().slice(0, 10);
        const time = new Date().toTimeString().split(' ')[0];
        this.moneyService.addOrderData(new Orders1(date, time, 'not shipped', this.paymentType, 'Empty', 'Empty',
            Number(localStorage.getItem('userId')), this.billingId, this.shippingId))
            .subscribe((result: Orders) => {
                if (result !== null) {
                    for (let i = 0; i < this.itemList.length; i++) {
                        this.moneyService.addOrderDetailData(new OrderDetail(this.itemList[i].cartQty, this.itemList[i].color,
                            (this.itemList[i].price * this.itemList[i].cartQty), this.itemList[i].id, result.id))
                            .subscribe((result1) => {
                                if (result1 !== null) {
                                    this.itemService.getItemById(this.itemList[i].id)
                                        .subscribe((result2: Items) => {
                                            const newQty = (result2.qtyOnHand - this.itemList[i].cartQty);
                                            result2.qtyOnHand = newQty;
                                            this.moneyService.updateItem(result2)
                                                .subscribe((result3) => {
                                                    if (result3 === null) {
                                                        allOk = false;
                                                    }
                                                }, (error3) => {
                                                    allOk = false;
                                                });
                                        });
                                }
                            });
                    }
                }
            });

        setTimeout(() => this.viewOrderStatus(allOk), 1000);

    }

    public viewOrderStatus(allOk) {
        setTimeout(() => this.spinner.hide(), 500);
        if (allOk) {
            this.sendMessage();
            Swal.fire('order placed success');
            this.router.navigate(['/home']);
            localStorage.removeItem('isSelectOldShippingAddress');
            localStorage.removeItem('isSelectOldBillingAddress');
            localStorage.removeItem('newBillingAddress');
            localStorage.removeItem('newShippingAddress');
            localStorage.removeItem('oldShippingAddress');
            localStorage.removeItem('oldBillingAddress');
            localStorage.removeItem('cartItemList');
            this.cartService.changeCount(0);
        } else {
            Swal.fire('order place failed try again');
        }
    }

    public sendMessage() {
        this.mailService.sendEmail({
            to: localStorage.getItem('userEmail'),
            subject: 'Regarding your order details',
            message: '<div style="width: 100%; height: 500px">\n' +
                '  <div style="width: 100%; height: 50px;">\n' +
                '    <img src="https://creative-red.s3.us-east-2.amazonaws.com/8266469940351170logo.png" style="height: 40px;">\n' +
                '  </div>\n' +
                '  <div style="width: 50%; display: inline-block; height: auto; ">\n' +
                '    <span style="font-weight: bold; font-size: 12px; text-align: left">Shipping Address <br><span\n' +
                '      style="font-weight: normal">' + this.sFirstName + '' + this.sLsatName + ' <br> ' + this.sAddressLine1 + ' <br> ' +
                '' + this.sAddressLine2 + ' <br>\n' +
                '    ' + this.sCity + ' <br> ' + this.sCountry + ' <br> ' + this.sPostalCode + '</span></span>\n' +
                '  </div>\n' +
                '  <div style="width: 50%; display: inline-block; height: auto;">\n' +
                '    <span style="font-weight: bold; font-size: 12px; text-align: left">Billing Address <br><span\n' +
                '      style="font-weight: normal">' + this.bFirstName + ' ' + this.bLsatName + ' <br> ' + this.sAddressLine1 + ' <br> ' +
                '' + this.sAddressLine2 + ' <br>\n' +
                '    ' + this.bCity + ' <br> ' + this.bCountry + ' <br> ' + this.sPostalCode + '</span></span>\n' +
                '  </div> <div style="width: 100%; font-size: 12px; margin: 10px; font-weight: bold;">\n' +
                '    <span>Total order price : LKR' + this.realTot + '</span>\n' +
                '  </div><div style="width: 100%; font-size: 12px; margin: 10px; font-weight: bold;">\n' +
                '    <span>Payment method : ' + this.paymentType + '</span>\n' +
                '  </div>\n' +
                '  <div style="width: 100%; font-size: 12px; margin: 10px; font-weight: bold;">\n' +
                '    <span>Payment ID : ' + this.paymentID + '</span>\n' +
                '  </div>\n' +
                '  <div *ngFor="let item of ' + this.itemList + '">\n' +
                '    <img style="width: 50px; height: 50px;" src="{{item.image}}" alt="">\n' +
                '  </div>\n' +
                '</div>'
        }).subscribe((result2) => {
            Swal.fire('Success', 'Email sent successfully ...!', 'success');
        });
    }

    public completeOrder() {
        let shippingAddressDetails: any = JSON.parse(localStorage.getItem('newShippingAddress'))

        const oldShippingAddress: any = JSON.parse(localStorage.getItem('oldShippingAddress'));
        const oldBillingAddress: any = JSON.parse(localStorage.getItem('oldBillingAddress'));

        const billingAddressDetails: any = JSON.parse(localStorage.getItem('newBillingAddress'));

        const itemsArr: Array<any> = JSON.parse(localStorage.getItem('cartItemList'));
        console.log(JSON.parse(shippingAddressDetails), JSON.parse(billingAddressDetails));
        const userId = localStorage.getItem('userId')
        // const { customerShippingId, ...shippingAddressDetails} = modifiedShippingData;

        // let modifiedItemsArr = itemsArr.map(item => ({
        //     itemId: item.id,
        //     qty: item.cartQty,
        //     color: item.color, 
        //     price: item.price
        // }))

        let modifiedItemsArr = itemsArr.map(item => {
            return {
                itemid: item.id,
                qty: item.cartQty,
                color: item.color,
                price: item.price
            }
        });

        this.moneyService.completeOrder(new Orders2(
            'OK',
            'card',
            0,
            0,
            Number(userId),
            billingAddressDetails == undefined ? oldBillingAddress : billingAddressDetails,
            shippingAddressDetails == undefined ? oldShippingAddress : shippingAddressDetails,
            modifiedItemsArr
        )).subscribe(result => {
            console.log(result);

            localStorage.removeItem('newShippingAddress');
            localStorage.removeItem('newBillingAddress');
            localStorage.removeItem('cartItemList');
            Swal.fire(
                'Order Complete',
                '',
                'success'
            )
            this.router.navigate(['/home'])
        }, (error) => {
            console.log(error)
        })


        console.log('helooo', modifiedItemsArr)
    }
}
