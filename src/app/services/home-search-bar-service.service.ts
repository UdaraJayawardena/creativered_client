import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class HomeSearchBarServiceService {

    constructor(private http: HttpClient) {
    }


    getAllProduct(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Products');
    }

    getAllCategories(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Categories');
    }
}
