import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CartServiceService {

    public changeCartCount = new BehaviorSubject<any>(0);
    public runChangeCartCount = this.changeCartCount.asObservable();

    constructor() {
    }

    public changeCount(count) {
        this.changeCartCount.next(count);
    }
}
