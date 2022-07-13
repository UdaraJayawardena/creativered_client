import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ItemRateServiceService {

    constructor(private http: HttpClient) {
    }

    public addRateItem(itemRate): Observable<any> {
        return this.http.post(environment.baseUrl + '/Item_rates?access_token=' + localStorage.getItem('tokenId'), itemRate);
    }

    public getAllItemRateByItemId(itemId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items/' + itemId + '/item-rate?access_token=' +
            localStorage.getItem('tokenId'));
    }
}
