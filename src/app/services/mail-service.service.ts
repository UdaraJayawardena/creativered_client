import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SuperService} from './super-service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MailServiceService {
    super = new SuperService();

    constructor(private http: HttpClient) {
    }

    sendEmail(param: { to: any; subject: string; message: string }): Observable<any> {
        return this.http.post(this.super.getEmailURL() + 'mail', param);
    }
}
