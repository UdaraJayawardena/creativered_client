import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Items} from '../dto/Items';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ItemServiceService {

    public isSearched = new BehaviorSubject<boolean>(false);
    public currentIsSearched = this.isSearched.asObservable();

    public itemId = new BehaviorSubject<string>('0');
    public currentItemId = this.itemId.asObservable();

    public maxMinPrieces = new BehaviorSubject<number[]>([1, 100000000]);
    public currentmaxMinPrieces = this.maxMinPrieces.asObservable();

    public searchItems = new BehaviorSubject<Array<Items>>(Items[0]);
    public currentSearchItems = this.searchItems.asObservable();

    public search = new BehaviorSubject<any>('');
    public currentSearch = this.search.asObservable();

    constructor(private http: HttpClient) {
    }

    public changeSearch() {
        this.search.next('');
    }

    searched(value) {
        this.isSearched.next(value);
    }

    public changeItemId(id) {
        this.itemId.next(id);
    }

    public changeMaxMinPrice(maxAndMin) {
        this.maxMinPrieces.next(maxAndMin);
    }

    getItemByProductId(productId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Products/' + productId + '/item');
    }

    getAllItems(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items?access_token=' + localStorage.getItem('tokenId'));
    }

    getItemById(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items/' + id);
    }

    getItemsByLimit(value): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items' + '?filter[limit]=' + 5 + '&filter[skip]=' + value);
    }

    getCountOfItems(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items' + '/count');
    }

    getProductByRelatedCategory(categoryId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Categories/' + categoryId + '/product');
    }

    public getItemRateByItemId(itemId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items/' + itemId + '/item-rate?access_token= ' + localStorage.getItem('tokenId'));
    }

    updateItem(newit: Items) {
        return this.http.put(environment.baseUrl + '/Items' + '?access_token=' + localStorage.getItem('tokenId'), newit);
    }
}
