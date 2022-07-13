import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-direct-sign-in',
    templateUrl: './direct-sign-in.component.html',
    styleUrls: ['./direct-sign-in.component.css']
})
export class DirectSignInComponent implements OnInit {
    @ViewChild('openModal') openModal: ElementRef;

    constructor() {
    }

    ngOnInit() {
        this.openModal.nativeElement.click();
    }

}
