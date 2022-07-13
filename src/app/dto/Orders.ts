export class Orders {
    orderDate: string;
    orderTime: string;
    status: string;
    paymentMethod: string;
    paymentId: string;
    trackingId: string;
    id: number;
    customerOrderId: number;
    billingid: number;
    shippingid: number;

    constructor(orderDate: string, orderTime: string, status: string, paymentMethod: string,
                paymentId: string, trackingId: string, id: number, customerOrderId: number, billingid: number, shippingid: number)
    constructor(orderDate?: string, orderTime?: string, status?: string, paymentMethod?: string,
                paymentId?: string, trackingId?: string, id?: number, customerOrderId?: number, billingid?: number, shippingid?: number, actions?: string) {
        this.orderDate = orderDate;
        this.orderTime = orderTime;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentId = paymentId;
        this.trackingId = trackingId;
        this.id = id;
        this.customerOrderId = customerOrderId;
        this.billingid = billingid;
        this.shippingid = shippingid;
    }
}

export class Orders1 {
    orderDate: string;
    orderTime: string;
    status: string;
    paymentMethod: string;
    paymentId: string;
    trackingId: string;
    customerOrderId: number;
    billingid: number;
    shippingid: number;

    constructor(orderDate: string, orderTime: string, status: string, paymentMethod: string, paymentId: string, trackingId: string, customerOrderId: number, billingid: number, shippingid: number) {
        this.orderDate = orderDate;
        this.orderTime = orderTime;
        this.status = status;
        this.paymentMethod = paymentMethod;
        this.paymentId = paymentId;
        this.trackingId = trackingId;
        this.customerOrderId = customerOrderId;
        this.billingid = billingid;
        this.shippingid = shippingid;
    }
}
