import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Orders} from '../dto/Orders';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class OrderServiceService {

    constructor(private http: HttpClient) {
    }

    getOrdersByCustomerId(id) {
        return this.http.get(environment.baseUrl + `/Orders/fetchOrderbyUserId?userId=${id}`);
    }

    addOrder(order: Orders) {
        return this.http.post(environment.baseUrl + '/Orders' + localStorage.getItem('tokenId'), order);
    }

    getOrderDetails(orderId): Observable<any> {
        return this.http.get(environment.baseUrl + '/OrderDetails?filter[where][orderid]=' + orderId.toString() + '&access_token=' +
            localStorage.getItem('tokenId'));
    }

    getAllOrders(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders?access_token=' + localStorage.getItem('tokenId'));
    }

    getAllOrderDetails(): Observable<any> {
        return this.http.get(environment.baseUrl + '/OrderDetails?access_token=' + localStorage.getItem('tokenId'));
    }
}
