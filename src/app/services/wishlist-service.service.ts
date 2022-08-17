import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class WishlistServiceService {

    public removeItemId = new BehaviorSubject<number>(0);
    public currentRemoveItemId = this.removeItemId.asObservable();

    constructor(private http: HttpClient) {
    }

    saveItem(wishlist): Observable<any> {
        return this.http.post(environment.baseUrl + '/WishLists', wishlist);
    }

    getAllWishListItem(): Observable<any> {
        return this.http.get(environment.baseUrl + '/WishLists');
    }

    removeItemById(id): Observable<any> {
        return this.http.delete(environment.baseUrl + '/WishLists/' + id);
    }

    public changeRemoveItemId(id) {
        this.removeItemId.next(id);
    }
}
