import {Component, OnInit} from '@angular/core';
import {ComplainServiceService} from '../../services/complain-service.service';
import {PurchaseHistoryServiceService} from '../../services/purchase-history-service.service';
import {Complain} from '../../dto/Complain';
import {ComplainType} from '../../dto/ComplainType';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-complain',
    templateUrl: './complain.component.html',
    styleUrls: ['./complain.component.css']
})
export class ComplainComponent implements OnInit {

    public complainTypes: Array<ComplainType> = [];
    public orderId: number;

    constructor(private complainService: ComplainServiceService, private purchaseHistoryService: PurchaseHistoryServiceService) {
        this.getAllComplaint();
    }

    ngOnInit() {
        this.getOrderId();
    }

    public getOrderId() {
        this.purchaseHistoryService.currentOrderIdForComplaint
            .subscribe((result) => {
                this.orderId = result;
                this.getOldComplainByOrderId(this.orderId);
            });
    }

    public getOldComplainByOrderId(orderId) {
        if (orderId !== 0) {
            this.complainService.getComplainByOrderId(orderId)
                .subscribe((result: Array<any>) => {
                    if (result.length !== 0) {
                        Swal.fire('You have already sent a complaint.also you can send another complaint.' +
                            '(for check old complaint go to your account.)');
                    }
                });
        }
    }

    public getAllComplaint() {
        this.complainService.getAllComplain()
            .subscribe((result) => {
                this.complainTypes = result;
            });
    }

    public saveComplain(message, complainType) {
        if (message !== '' && complainType !== 'Select complaint type') {
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().toTimeString().split(' ')[0];
            let complainTypeId = 0;
            for (let i = 0; i < this.complainTypes.length; i++) {
                if (this.complainTypes[i].complainType.includes(complainType)) {
                    complainTypeId = this.complainTypes[i].id;
                }
            }
            const complain = new Complain(date, time, message, 'false', complainTypeId, this.orderId);
            this.complainService.addComplain(complain)
                .subscribe((result) => {
                    Swal.fire(
                        'success !',
                        '',
                        'success'
                    );
                }, (error) => {
                    Swal.fire(
                        'try again !',
                        '',
                        'error'
                    );
                });
        } else {
            alert('select complain type and then enter your message');
        }
    }

}
