import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';
import {Observable} from 'rxjs/internal/Observable';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})

export class ProductServiceService {

    public productId = new BehaviorSubject<number>(0);
    public currentProductId = this.productId.asObservable();

    constructor(private http: HttpClient) {

    }

    getAllProducts(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Products');
    }

    getProductById(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/Products/' + id);
    }

    changeItem(id: number) {
        this.productId.next(id);
    }

    getItemByProductId(productId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Products/' + productId + 'item?access_token=' + localStorage.getItem('tokenId'));
    }
}
