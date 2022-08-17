import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class OrderDetailServiceService {

    constructor(private http: HttpClient) {
    }

    public getAllOrderDetails(): Observable<any> {
        return this.http.get(environment.baseUrl + '/OrderDetails?access_token=' + localStorage.getItem('tokenId'));
    }

    public getOrderDetailByOrderId(): Observable<any> {
        return this.http.get(environment.baseUrl + '');
    }

}
