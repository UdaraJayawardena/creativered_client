import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Orders} from '../dto/Orders';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class OrderServiceService {

    constructor(private http: HttpClient) {
    }

    getOrdersByCustomerEmail(email) {
        return this.http.get(environment.baseUrl + '/Orders/' + email + '/customer');
    }

    addOrder(order: Orders) {
        return this.http.post(environment.baseUrl + '/Orders', order);
    }
}
