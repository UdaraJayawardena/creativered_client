import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
    selector: 'app-direct-reset',
    templateUrl: './direct-reset.component.html',
    styleUrls: ['./direct-reset.component.css']
})
export class DirectResetComponent implements OnInit {
    @ViewChild('openModal') openModal: ElementRef;
    @ViewChild('closeModal') closeModal: ElementRef;

    constructor(private router: Router) {
    }

    ngOnInit() {
        this.openModal.nativeElement.click();
    }

    resetPassword(password, password2) {
        if (password === '' || password2 === '') {
            Swal.fire('fill the fields');
        } else if (password !== password2) {
            Swal.fire('passwords are not matching !');
        } else {
            this.closeModal.nativeElement.click();
            this.router.navigate(['/home']);
        }
    }
}