export class Items {
    name: string;
    brand: string;
    qtyOnHand: number;
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

    constructor()
    constructor(name: string)
    constructor(name: string, brand: string, qtyOnHand: number, price: number, image: string, status: string, highlights: string,
                specification: string, overview: string, hits: number, color: string, rate: number, discount: number, productid: number)
    constructor(name: string, brand: string, qtyOnHand: number, price: number, image: string, status: string, highlights: string,
                specification: string, overview: string, hits: number, color: string, rate: number, discount: number, productid: number,
                id: number)
    constructor(name?: string, brand?: string, qtyOnHand?: number, price?: number, image?: string, status?: string, highlights?: string,
                specification?: string, overview?: string, hits?: number, color?: string, rate?: number, discount?: number,
                productid?: number, id?: number) {
        this.name = name;
        this.brand = brand;
        this.qtyOnHand = qtyOnHand;
        this.price = price;
        this.image = image;
        this.status = status;
        this.highlights = highlights;
        this.specification = specification;
        this.overview = overview;
        this.color = color;
        this.rate = rate;
        this.discount = discount;
        this.productid = productid;
        this.id = id;
    }
}

export class Search {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export class Qtydto {
    id: number;
    qty: number;

    constructor(id: number, qty: number) {
        this.id = id;
        this.qty = qty;
    }
}

export class CheckQty {
    id: number;
    check: boolean;

    constructor(id: number, check: boolean) {
        this.id = id;
        this.check = check;
    }
}
