export class Product {
    productType: string;
    categoryid: number;
    id: number;

    constructor(productType: string)
    constructor(productType: string, categoryid: number)
    constructor(productType: string, categoryid: number, id: number)

    constructor(productType?: string, categoryid?: number, id?: number) {
        this.productType = productType;
        this.categoryid = categoryid;
        this.id = id;
    }
}
