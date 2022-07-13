export class RentalMessage {
    name: string;
    email: string;
    message: string;
    rentalItemID: number;


    constructor(name: string, email: string, message: string, rentalItemID: number) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.rentalItemID = rentalItemID;
    }
}

export class RentalMessage1 {
    name: string;
    email: string;
    message: string;
    id: number;
    rentalItemID: number;

    constructor(name: string, email: string, message: string, id: number, rentalItemID: number) {
        this.name = name;
        this.email = email;
        this.message = message;
        this.id = id;
        this.rentalItemID = rentalItemID;
    }
}
