import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Customers} from '../dto/Customer';
import {ShippingAddress} from '../dto/ShippingAddress';
import {Orders1, Orders2} from '../dto/Orders';
import {OrderDetail} from '../dto/OrderDetail';
import {Items} from '../dto/Items';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class MoneyServiceService {

    constructor(private http: HttpClient) {
    }

    getCustomerData(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/Customers/' + id + '?access_token=' + localStorage.getItem('tokenId'));
    }

    updateCustomer(newcus: Customers) {
        return this.http.put(environment.baseUrl + '/Customers' + '?access_token=' + localStorage.getItem('tokenId'), newcus);
    }

    addShippingData(shipdata: ShippingAddress) {
        return this.http.post(environment.baseUrl + '/ShippingAddresses' + '?access_token=' + localStorage.getItem('tokenId'), shipdata);
    }

    getAllShipData(): Observable<any> {
        return this.http.get(environment.baseUrl + '/ShippingAddresses' + '?access_token=' + localStorage.getItem('tokenId'));
    }

    getAllBillData(): Observable<any> {
        return this.http.get(environment.baseUrl + '/BillingAddresses' + '?access_token=' + localStorage.getItem('tokenId'));
    }

    addOrderData(ordrdata: Orders1) {
        return this.http.post(environment.baseUrl + '/Orders' + '?access_token=' + localStorage.getItem('tokenId'), ordrdata);
    }

    getAllOrder(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders' + '?access_token=' + localStorage.getItem('tokenId'));
    }

    addOrderDetailData(temordobj: OrderDetail) {
        return this.http.post(environment.baseUrl + '/OrderDetails' + '?access_token=' + localStorage.getItem('tokenId'), temordobj);
    }

    getItemIdData(itemid) {
        return this.http.get(environment.baseUrl + '/Items/' + itemid + '?access_token=' + localStorage.getItem('tokenId'));
    }

    updateItem(newit: Items) {
        return this.http.put(environment.baseUrl + '/Items' + '?access_token=' + localStorage.getItem('tokenId'), newit);
    }

    completeOrder(orderObj: Orders2) {
        return this.http.post(environment.baseUrl + '/Orders/completePurchase' + '?access_token=' + localStorage.getItem('tokenId'), orderObj);
    }
}
