import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BillingAddress1} from '../dto/BillingAddress';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class BillingAddressServiceService {

    constructor(private http: HttpClient) {
    }

    addBillingAddress(bill: BillingAddress1) {
        return this.http.post(environment.baseUrl + '/BillingAddresses' + '?access_token=' + localStorage.getItem('tokenId'), bill);
    }

    getLoggedBillings(): Observable<any> {
        return this.http.get(environment.baseUrl + '/BillingAddresses' + '?access_token=' + localStorage.getItem('tokenId'));
    }

    getBillingAddressByCustomerId(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + localStorage.getItem('userId') +
            '/billing-address?access_token=' + localStorage.getItem('tokenId'));
    }

    getLoggedShippings(): Observable<any> {
        return this.http.get(environment.baseUrl + '/ShippingAddresses' + '?access_token=' + localStorage.getItem('tokenId'));
    }

    updateBillingAddress(billingAddress): Observable<any> {
        return this.http.put(environment.baseUrl + '/BillingAddresses' + '?access_token=' +
            localStorage.getItem('tokenId'), billingAddress);
    }

    getBillingAddressByOrderId(orderId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders/' + orderId + '/billing-address?access_token=' +
            localStorage.getItem('tokenId'));
    }

    public saveNewAddress(address): Observable<any> {
        return this.http.post(environment.baseUrl + '/BillingAddresses?access_token=' + localStorage.getItem('tokenId'), address);
    }
}
