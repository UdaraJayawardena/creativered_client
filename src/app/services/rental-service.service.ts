import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class RentalServiceService {

    constructor(private http: HttpClient) {
    }

    saveMessage(message): Observable<any> {
        return this.http.post(environment.baseUrl + '/RentalMessages?', message);
    }
}
