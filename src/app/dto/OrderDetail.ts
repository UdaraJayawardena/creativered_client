export class OrderDetail {
    qty: number;
    color: string;
    price: number;
    itemid: number;
    orderid: number;
    id: number;

    constructor(qty: number, color: string, price: number, itemid: number, orderid: number)
    constructor(qty?: number, color?: string, price?: number, itemid?: number, orderid?: number, id?: number) {
        this.qty = qty;
        this.color = color;
        this.price = price;
        this.itemid = itemid;
        this.orderid = orderid;
        this.id = id;
    }
}

export class OrderDetail2 {
    id: number;
    orderDate: Date;
    orderTime: Date;
    status: string;
    paymentMethod: string;
    paymentId: string;
    trackingId: string;
    customerOrderId: number;
    billingid: number;
    shippingid: number;
    shippingAddress: number;

    constructor(id:number, orderDate: Date, orderTime: Date, status: string, paymentMethod: string, paymentId: string,
        trackingId: string, customerOrderId: number, billingid: number, shippingid: number, shippingAddress: number) {
            this.id=id;
            this.orderDate = orderDate;
            this.orderTime = orderTime;
            this.status = status;
            this.paymentMethod = paymentMethod;
            this.paymentId = paymentId;
            this.trackingId = trackingId;
            this.customerOrderId = customerOrderId;
            this.billingid = billingid;
            this.shippingid = shippingid;
            this.shippingAddress = shippingAddress;
        }
}