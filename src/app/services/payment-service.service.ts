import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable({
    providedIn: 'root'
})
export class PaymentServiceService {

    public totalPrice = new BehaviorSubject<string>('0');
    public currentTotalPrice = this.totalPrice.asObservable();

    public paymentId = new BehaviorSubject<string>('');
    public currentPaymentId = this.paymentId.asObservable();

    public paymentType = new BehaviorSubject<string>('paypal');
    public currentPaymentType = this.paymentType.asObservable();

    constructor() {
    }

    public changeTotalPrice(total) {
        this.totalPrice.next(total);
    }

    public changePaymentId(id) {
        this.paymentId.next(id);
    }

    public changePaymentType(type) {
        alert(type);
        this.paymentType.next(type);
    }
}
