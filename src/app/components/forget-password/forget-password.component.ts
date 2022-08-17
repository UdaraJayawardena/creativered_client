import {Component, OnInit} from '@angular/core';
import {CustomerServiceService} from '../../services/customer-service.service';
import Swal from 'sweetalert2';
import {ResetByMail} from '../../dto/Customer';

@Component({
    selector: 'app-forget-password',
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

    constructor(private customerService: CustomerServiceService) {
    }

    ngOnInit() {
    }

    public forgetPassword(email) {
        if (email === '') {
            Swal.fire('fill the fields !');
        } else {
            const obj = new ResetByMail(email);
            this.customerService.resetCustomer(obj)
                .subscribe((result) => {
                        Swal.fire('check your email !');
                    }, (error1 => {
                        Swal.fire('email is not valid !');
                    })
                );
        }
    }

}
