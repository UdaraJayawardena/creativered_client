export class RentalItem {
    url: string;
    itemName: string;
    id: number;
    category_ID: number;

    constructor(url: string, itemName: string, id: number, category_ID: number) {
        this.url = url;
        this.itemName = itemName;
        this.id = id;
        this.category_ID = category_ID;
    }
}
