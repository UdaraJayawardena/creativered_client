import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'clientFrontend';
    cardno: any;
    cvs: any;
    month: any;
    year: any;

    pay() {
        console.log();
    }
}
