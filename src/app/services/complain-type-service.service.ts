import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ComplainTypeServiceService {

    constructor(private http: HttpClient) {
    }

    getAllCoplainTypes(): Observable<any> {
        return this.http.get(environment.baseUrl + '/ComplainTypes');
    }
}
