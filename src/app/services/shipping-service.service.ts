import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShippingAddress1} from '../dto/ShippingAddress';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ShippingServiceService {

    constructor(private http: HttpClient) {
    }

    public getShippingAddressByCustomerId(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + localStorage.getItem('userId') +
            '/shipping-address?access_token=' + localStorage.getItem('tokenId'));
    }

    public getShippingAddressByID(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/ShippingAddresses/' + id + '?access_token=' +
            localStorage.getItem('tokenId'));
    }

    public updateShippingAddress(shippingAddress: ShippingAddress1): Observable<any> {
        return this.http.put(environment.baseUrl + '/ShippingAddresses?access_token=' + localStorage.getItem('tokenId'),
            shippingAddress);
    }

    public saveShippingAddress(address): Observable<any> {
        console.log(address);
        return this.http.post(environment.baseUrl + '/ShippingAddresses?access_token=' + localStorage.getItem('tokenId'), address);
    }
}
