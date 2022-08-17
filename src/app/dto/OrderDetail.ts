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
