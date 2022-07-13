import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Complain} from '../dto/Complain';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class ComplainServiceService {

    constructor(private http: HttpClient) {
    }

    addComplain(complain: Complain): Observable<any> {
        return this.http.post(environment.baseUrl + '/Complains?access_token=' + localStorage.getItem('tokenId'), complain);
    }

    public getAllComplain(): Observable<any> {
        return this.http.get(environment.baseUrl + '/ComplainTypes?access_token=' + localStorage.getItem('tokenId'));
    }

    public getComplainTypeByID(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/ComplainTypes/' + id + '?access_token=' +
            localStorage.getItem('tokenId'));
    }

    public getComplainReplyById(id): Observable<any> {
        return this.http.get(environment.baseUrl + '/Complains/' + id + '/complain-reply?access_token=' +
            localStorage.getItem('tokenId'));
    }

    public getComplainByOrderId(orderId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders/' + orderId + '/complain?access_token=' +
            localStorage.getItem('tokenId'));
    }

}
