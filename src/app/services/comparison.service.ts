import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ComparisonService {

    public isSelectItem = new BehaviorSubject<boolean>(false);
    public currentIsSelectItem = this.isSelectItem.asObservable();

    constructor(private http: HttpClient) {
    }

    getAllItemDetail(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Items');
    }

    public changeIsSelectItem(value) {
        this.isSelectItem.next(value);
    }
}
