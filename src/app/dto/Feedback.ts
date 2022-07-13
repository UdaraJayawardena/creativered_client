export class Feedback {
    feedDate: string;
    feedTime: string;
    feedbackMessage: string;
    itemAsDescribe_Rate: number;
    communicationRate: number;
    shippingTimeRate: number;
    shippingHandlingRate: number;
    feedbackOrderId: number;

    constructor(feedDate: string, feedTime: string, feedbackMessage: string, itemAsDescribe_Rate: number, communicationRate: number,
                shippingTimeRate: number, shippingHandlingRate: number, feedbackOrderId: number) {
        this.feedDate = feedDate;
        this.feedTime = feedTime;
        this.feedbackMessage = feedbackMessage;
        this.itemAsDescribe_Rate = itemAsDescribe_Rate;
        this.communicationRate = communicationRate;
        this.shippingTimeRate = shippingTimeRate;
        this.shippingHandlingRate = shippingHandlingRate;
        this.feedbackOrderId = feedbackOrderId;
    }
}

export class Feedback1 {
    feedDate: string;
    feedTime: string;
    feedbackMessage: string;
    itemAsDescribe_Rate: number;
    communicationRate: number;
    shippingTimeRate: number;
    shippingHandlingRate: number;
    id: number;
    feedbackOrderId: number;


    constructor(feedDate: string, feedTime: string, feedbackMessage: string, itemAsDescribe_Rate: number, communicationRate: number,
                shippingTimeRate: number, shippingHandlingRate: number, id: number, feedbackOrderId: number) {
        this.feedDate = feedDate;
        this.feedTime = feedTime;
        this.feedbackMessage = feedbackMessage;
        this.itemAsDescribe_Rate = itemAsDescribe_Rate;
        this.communicationRate = communicationRate;
        this.shippingTimeRate = shippingTimeRate;
        this.shippingHandlingRate = shippingHandlingRate;
        this.id = id;
        this.feedbackOrderId = feedbackOrderId;
    }
}
