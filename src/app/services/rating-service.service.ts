import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feedback} from '../dto/Feedback';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment.prod';

@Injectable({
    providedIn: 'root'
})
export class RatingServiceService {

    constructor(private http: HttpClient) {
    }

    saveFeedBack(feedback: Feedback): Observable<any> {
        return this.http.post(environment.baseUrl + '/Feedbacks?access_token=' + localStorage.getItem('tokenId'), feedback);
    }

    public updateItemRate(item): Observable<any> {
        return this.http.put(environment.baseUrl + '/Item_rates?access_token=' + localStorage.getItem('tokenId'), item);
    }

    public getFeedbackByOrderId(orderId): Observable<any> {
        return this.http.get(environment.baseUrl + '/Orders/' + orderId + '/feedback?access_token=' + localStorage.getItem('tokenId'));
    }
}
