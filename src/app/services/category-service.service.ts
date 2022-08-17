import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';


@Injectable({
    providedIn: 'root'
})
export class CategoryServiceService {

    constructor(private http: HttpClient) {
    }

    getAllCategories(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Categories');
    }

    getRentalItemByCategory(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/Categories/' + id + '/rentalItem?access_token=' + localStorage.getItem('tokenId'));
    }

}
