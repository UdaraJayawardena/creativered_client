export class WishList {
    itemId: string;
    customerWishlistId: number;
    id: number;


    constructor(itemId: string, customerWishlistId: number) {
        this.itemId = itemId;
        this.customerWishlistId = customerWishlistId;
    }
}
