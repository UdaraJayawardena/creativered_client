import {Injectable} from '@angular/core';
import {SuperService} from './super-service';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FeedbackServiceService {

    super = new SuperService();

    constructor(private http: HttpClient) {
    }
}
