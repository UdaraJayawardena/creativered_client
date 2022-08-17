export class ShippingAddress {
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    country: string;
    postalCode: string;
    status: boolean;
    customerShippingId: number;

    constructor()
    constructor(firstName: string, lastName: string, addressOne: string, addressTwo: string, city: string, country: string,
                postalCode: string, status: boolean, customerShippingId: number)
    constructor(firstName?: string, lastName?: string, addressOne?: string, addressTwo?: string, city?: string, country?: string,
                postalCode?: string, status?: boolean, customerShippingId?: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.status = status;
        this.customerShippingId = customerShippingId;
    }
}

export class ShippingAddress1 {
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    country: string;
    postalCode: string;
    status: boolean;
    id: number;
    customerShippingId: number;

    constructor(firstName: string, lastName: string, addressOne: string, addressTwo: string, city: string, country: string,
                postalCode: string, status: boolean, id: number, customerShippingId: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.status = status;
        this.id = id;
        this.customerShippingId = customerShippingId;
    }
}
