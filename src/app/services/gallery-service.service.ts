import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class GalleryServiceService {

    constructor(private http: HttpClient) {
    }

    getAllImages(): Observable<any> {
        return this.http.get(environment.baseUrl + '/Galleries?');
    }
}
