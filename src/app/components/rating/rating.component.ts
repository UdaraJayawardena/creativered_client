import {Component, OnInit} from '@angular/core';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import {PurchaseHistoryServiceService} from '../../services/purchase-history-service.service';
import {Feedback, Feedback1} from '../../dto/Feedback';
import {RatingServiceService} from '../../services/rating-service.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

    public oldFeedBack: Feedback1;
    public itemRate = 0;
    public communicationRate = 0;
    public shippingTimeRate = 0;
    public shippingHandlingRate = 0;
    public oldFeedBackMessage = '';
    public haveOldFeedback = false;

    public orderId: number;

    constructor(private config: NgbRatingConfig, private purchaseHistoryService: PurchaseHistoryServiceService,
                private ratingService: RatingServiceService) {
        config.max = 5;
    }

    ngOnInit() {
        this.getOrderId();
    }

    public clearFields() {
        this.itemRate = 0;
        this.communicationRate = 0;
        this.shippingTimeRate = 0;
        this.shippingHandlingRate = 0;
        this.haveOldFeedback = false;
    }

    public getOrderId() {
        this.clearFields();
        this.purchaseHistoryService.currentOrderIdForFeedBack
            .subscribe((result: number) => {
                this.orderId = result;
                this.getOldFeedBackByOrderId(this.orderId);
            });
    }

    public getOldFeedBackByOrderId(orderId) {
        if (orderId !== 0) {
            this.ratingService.getFeedbackByOrderId(orderId)
                .subscribe((result: Array<Feedback1>) => {
                    if (result.length !== 0) {
                        this.oldFeedBack = result[0];
                        this.haveOldFeedback = true;
                        this.itemRate = result[0].itemAsDescribe_Rate;
                        this.communicationRate = result[0].communicationRate;
                        this.shippingTimeRate = result[0].shippingTimeRate;
                        this.shippingHandlingRate = result[0].shippingHandlingRate;
                        this.oldFeedBackMessage = result[0].feedbackMessage;
                    }
                });
        }
    }

    public saveFeedBack(message: string) {
        if ((message !== '')) {
            const date = new Date().toISOString().slice(0, 10);
            const time = new Date().toTimeString().split(' ')[0];
            const feedback = new Feedback(date, time, message, this.itemRate, this.communicationRate, this.shippingTimeRate,
                this.shippingHandlingRate, this.orderId);
            this.ratingService.saveFeedBack(feedback)
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
            alert('please enter your feedback');
        }
    }
}
