export class Customers {
    firstName: string;
    lastName: string;
    realm: string;
    username: string;
    email: string;
    emailVerified: boolean;
    id: number;
    password: string;

    constructor(firstName: string, lastName: string, realm: string, username: string, email: string, emailVerified: boolean, id: number, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.realm = realm;
        this.username = username;
        this.email = email;
        this.emailVerified = emailVerified;
        this.id = id;
        this.password = password;
    }
}

export class Customerss {
    firstName: string;
    lastName: string;
    subscribe: boolean;
    realm: string;
    username: string;
    email: string;
    emailVerified: boolean;
    id: number;

    constructor()
    constructor(firstName: string, lastName: string, subscribe: boolean, realm: string, username: string, email: string,
                emailVerified: boolean, id: number)
    constructor(firstName?: string, lastName?: string, subscribe?: boolean, realm?: string, username?: string, email?: string,
                emailVerified?: boolean, id?: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.subscribe = subscribe;
        this.realm = realm;
        this.username = username;
        this.email = email;
        this.emailVerified = emailVerified;
        this.id = id;
    }
}

export class Customer1 {
    firstName: string;
    lastName: string;
    subscribe: boolean;
    realm: string;
    username: string;
    email: string;
    emailVerified: boolean;
    password: string;

    constructor(firstName: string, lastName: string, subscribe: boolean, realm: string, username: string, email: string,
                emailVerified: boolean, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.subscribe = subscribe;
        this.realm = realm;
        this.username = username;
        this.email = email;
        this.emailVerified = emailVerified;
        this.password = password;
    }
}


export class CustomerUser {
    id: string;
    userId: number;


    constructor(id: string, userId: number) {
        this.id = id;
        this.userId = userId;
    }
}

export class Customer2 {
    id: number;

    constructor(id: number) {
        this.id = id;
    }
}

export class Customer3 {
    email: string;
    password: string;


    constructor(email: string, password: string) {
        this.email = email;
        this.password = password;
    }
}

export class CustomerU {
    firstName: string;
    lastName: string;
    realm: string;
    username: string;
    email: string;
    emailVerified: boolean;
    id: number;

    constructor(firstName: string, lastName: string, realm: string, username: string, email: string, emailVerified: boolean, id: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.realm = realm;
        this.username = username;
        this.email = email;
        this.emailVerified = emailVerified;
        this.id = id;
    }
}

export class UpdateCustomer {
    firstName: string;
    lastName: string;
    subscribe: boolean;
    realm: string;
    username: string;
    email: string;
    password: string;
    emailVerified: boolean;
    id: number;


    constructor(firstName: string, lastName: string, subscribe: boolean, realm: string, username: string, email: string
        , password: string, emailVerified: boolean, id: number) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.subscribe = subscribe;
        this.realm = realm;
        this.username = username;
        this.email = email;
        this.password = password;
        this.emailVerified = emailVerified;
        this.id = id;
    }
}

export class ResetCustomer {
    oldPassword: string;
    newPassword: string;

    constructor(oldPassword: string, newPassword: string) {
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }
}

export class ResetByMail {
    email: string;

    constructor(email: string) {
        this.email = email;
    }
}
