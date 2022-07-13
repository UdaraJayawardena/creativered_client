import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CountriesService {

    constructor(private http: HttpClient) {
    }

    private _countriesURL = '/assets/data/postal_codes.json';

    getAllCountries(): Observable<any> {
        return this.http.get(this._countriesURL);
    }
}
