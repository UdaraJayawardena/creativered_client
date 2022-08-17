import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Customer1, Customer3} from '../dto/Customer';
import {Observable} from 'rxjs/internal/Observable';
import {BehaviorSubject} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class CustomerServiceService {

    public isLogin = new BehaviorSubject<boolean>(false);
    public currentIsLogin = this.isLogin.asObservable();

    public customerAuth = new BehaviorSubject<any>('');
    public currentCustomerAuth = this.customerAuth.asObservable();

    constructor(private http: HttpClient) {
    }

    public changeIsLogin(value) {
        this.isLogin.next(value);
    }

    public changeCustomerAuth(value) {
        this.customerAuth.next(value);
    }

    addCustomer(cus: Customer1) {
        return this.http.post(environment.baseUrl + '/Customers', cus);
    }

    verifyEmail(cid) {
        return this.http.post(environment.baseUrl + '/Customers/' + cid.toString() + '/verify', cid);
    }

    loginCustomer(cus: Customer3) {
        return this.http.post(environment.baseUrl + '/Customers/login', cus);
    }

    checkVerify(userId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + userId.toString() + '?access_token=' + localStorage.getItem('tokenId'));
    }

    getCustomerDetails(customerId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + customerId + '?access_token=' +
            localStorage.getItem('tokenId'));
    }

    updateCustomer(cusObj): Observable<any> {
        return this.http.put(environment.baseUrl + '/Customers' + '?access_token=' + localStorage.getItem('tokenId'), cusObj);
    }

    changePassword(cus): Observable<any> {
        return this.http.post(environment.baseUrl + '/Customers/' + 'change-password' + '?access_token=' +
            localStorage.getItem('tokenId'), cus);
    }

    public getCustomerById(customerId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + customerId + '?access_token=' + localStorage.getItem('tokenId'));
    }

    public getCustomerOrdersByCustomerId(): Observable<any> {
        // tslint:disable-next-line:max-line-length
        return this.http.get(environment.baseUrl + '/Customers/' + localStorage.getItem('userId') + '/orders?access_token=' + localStorage.getItem('tokenId'));
    }

    public getComplainsByOrderId(orderId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders/' + orderId + '/complain?access_token=' +
            localStorage.getItem('tokenId'));
    }

    public resetCustomer(email): Observable<any> {
        return this.http.post(environment.baseUrl + '/Customers' + '/reset', email);
    }
}
