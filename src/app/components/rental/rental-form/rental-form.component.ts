import {Component, OnInit} from '@angular/core';
import {RentalServiceService} from '../../../services/rental-service.service';
import {RentalMessage} from '../../../dto/RentalMessage';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-rental-form',
    templateUrl: './rental-form.component.html',
    styleUrls: ['./rental-form.component.css']
})
export class RentalFormComponent implements OnInit {

    public nameInput = false;
    public messageInput = false;
    public emailInput = false;

    public nameValue = false;
    public emailValue = false;
    public messageValue = false;

    public nameRegex = new RegExp('[a-zA-Z \\s \'.\']{3,}');
    public emailRegex = new RegExp('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$');

    constructor(private rentalService: RentalServiceService) {
    }

    ngOnInit() {
    }

    public sendMessage(name, email, message) {
        const itemId = JSON.parse(localStorage.getItem('rentItemId'));
        if (itemId !== null) {
            let ok = false;
            if (name === '') {
                ok = false;
                this.nameInput = true;
            } else {
                ok = true;
            }
            if (email === '') {
                ok = false;
                this.emailInput = true;
            } else {
                ok = true;
            }
            if (message === '') {
                ok = false;
                this.messageInput = true;
            } else {
                ok = true;
            }
            if (ok) {
                let allOk = false;
                if (this.nameRegex.test(name)) {
                    allOk = true;
                } else {
                    allOk = false;
                    this.nameValue = true;
                }
                if (this.emailRegex.test(email)) {
                    allOk = true;
                } else {
                    allOk = false;
                    this.emailValue = true;
                }
                if (allOk) {
                    const rentalMessage = new RentalMessage(name, email, message, Number(itemId));
                    this.rentalService.saveMessage(rentalMessage)
                        .subscribe((result) => {
                            if (result !== null) {
                                Swal.fire('message sent success !');
                            } else {
                                Swal.fire('message sent failed, try again !');
                            }
                        }, (error) => {
                        });
                }
            }
        }
    }

    nameClick() {
        this.nameInput = false;
        this.nameValue = false;
    }

    emailClick() {
        this.emailInput = false;
        this.emailValue = false;
    }

    messageClick() {
        this.messageInput = false;
        this.messageValue = false;
    }
}
