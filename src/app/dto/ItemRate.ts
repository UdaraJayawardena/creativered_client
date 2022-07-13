export class ItemRate {
    rate: number;
    review: string;
    customerRateId: number;
    itm_id: number;


    constructor(rate: number, review: string, customerRateId: number, itm_id: number) {
        this.rate = rate;
        this.review = review;
        this.customerRateId = customerRateId;
        this.itm_id = itm_id;
    }
}

export class ItemRate1 {
    rate: number;
    review: string;
    id: number;
    customerRateId: number;
    itm_id: number;


    constructor(rate: number, review: string, id: number, customerRateId: number, itm_id: number) {
        this.rate = rate;
        this.review = review;
        this.id = id;
        this.customerRateId = customerRateId;
        this.itm_id = itm_id;
    }
}
