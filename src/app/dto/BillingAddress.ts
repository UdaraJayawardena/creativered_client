export class BillingAddress1 {
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    country: string;
    postalCode: string;
    status: boolean;
    customerBillingId: number;

    constructor(firstName: string, lastName: string, addressOne: string, addressTwo: string, city: string, country: string,
                postalCode: string, status: boolean, customerBillingId: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.status = status;
        this.customerBillingId = customerBillingId;
    }
}

export class BillingAddress2 {
    firstName: string;
    lastName: string;
    addressOne: string;
    addressTwo: string;
    city: string;
    country: string;
    postalCode: string;
    status: boolean;
    id: number;
    customerBillingId: number;

    constructor(firstName: string, lastName: string, addressOne: string, addressTwo: string, city: string, country: string,
                postalCode: string, status: boolean, id: number, customerBillingId: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.addressOne = addressOne;
        this.addressTwo = addressTwo;
        this.city = city;
        this.country = country;
        this.postalCode = postalCode;
        this.status = status;
        this.id = id;
        this.customerBillingId = customerBillingId;
    }
}
