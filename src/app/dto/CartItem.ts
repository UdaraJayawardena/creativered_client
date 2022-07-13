export class CartItem {
    name: string;
    brand: string;
    qtyOnHand: number;
    cartQty: number;
    price: number;
    image: string;
    status: string;
    highlights: string;
    specification: string;
    overview: string;
    hits: number;
    color: string;
    rate: number;
    discount: number;
    productid: number;
    id: number;


    constructor(name: string, brand: string, qtyOnHand: number, cartQty: number, price: number, image: string, status: string,
                highlights: string, specification: string, overview: string, hits: number, color: string, rate: number, discount: number,
                productid: number, id: number) {
        this.name = name;
        this.brand = brand;
        this.qtyOnHand = qtyOnHand;
        this.cartQty = cartQty;
        this.price = price;
        this.image = image;
        this.status = status;
        this.highlights = highlights;
        this.specification = specification;
        this.overview = overview;
        this.hits = hits;
        this.color = color;
        this.rate = rate;
        this.discount = discount;
        this.productid = productid;
        this.id = id;
    }
}
