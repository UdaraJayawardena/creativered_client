export class Complain {
    comDate: string;
    comTime: string;
    message: string;
    status: string;
    complainTypeID: number;
    complainOrderId: number;

    constructor(comDate: string, comTime: string, message: string, status: string, complainTypeID: number, complainOrderId: number) {
        this.comDate = comDate;
        this.comTime = comTime;
        this.message = message;
        this.status = status;
        this.complainTypeID = complainTypeID;
        this.complainOrderId = complainOrderId;
    }
}

export class Complain1 {
    comDate: string;
    comTime: string;
    message: string;
    status: string;
    complainTypeID: number;
    id: number;
    complainOrderId: number;


    constructor(comDate: string, comTime: string, message: string, status: string, complainTypeID: number, id: number,
                complainOrderId: number) {
        this.comDate = comDate;
        this.comTime = comTime;
        this.message = message;
        this.status = status;
        this.complainTypeID = complainTypeID;
        this.id = id;
        this.complainOrderId = complainOrderId;
    }
}
