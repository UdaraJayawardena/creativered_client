import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class DealsServiceService {

    constructor(private http: HttpClient) {
    }

    public getAllNews() {
        return this.http.get(environment.baseUrl + '/News');
    }
}
