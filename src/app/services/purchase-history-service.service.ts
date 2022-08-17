import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class PurchaseHistoryServiceService {

    public orderIdForComplaint = new BehaviorSubject<number>(0);
    public currentOrderIdForComplaint = this.orderIdForComplaint.asObservable();

    public orderIdForFeedBack = new BehaviorSubject<number>(0);
    public currentOrderIdForFeedBack = this.orderIdForFeedBack.asObservable();

    constructor(private http: HttpClient) {
    }

    getOrderByCustomerId(customerId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + customerId + '/orders?' + 'access_token=' +
            localStorage.getItem('tokenId'));
    }

    getOrderDetailByOrderId(oid): Observable<any> {
        return this.http.get(environment.baseUrl + '/OrderDetails?filter[where][orderid]=' + oid + '&access_token=' +
            localStorage.getItem('tokenId'));
    }

    getShippingAddresByOrderId(oid): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders/' + oid + '/shipping-address?access_token=' +
            localStorage.getItem('tokenId'));
    }

    getAllComplainType(): Observable<any> {
        return this.http.get(environment.baseUrl + '/ComplainTypes?access_token=' + localStorage.getItem('tokenId'));
    }

    public getOrderById(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders/' + id + '?access_token=' + localStorage.getItem('tokenId'));
    }

    public changeOrderIdForComplaint(id) {
        this.orderIdForComplaint.next(id);
    }

    public changeOrderIdForFeedBack(id) {
        this.orderIdForFeedBack.next(id);
    }

}
