export class RefundRequest {
    refDate: string;
    refTime: string;
    reason: string;
    status: string;
    orderid: number;
    id: number;
    refundorderId: number;

    constructor(refDate: string, refTime: string, reason: string, status: string, orderid: number, id: number, refundorderId: number) {
        this.refDate = refDate;
        this.refTime = refTime;
        this.reason = reason;
        this.status = status;
        this.orderid = orderid;
        this.id = id;
        this.refundorderId = refundorderId;
    }
}
