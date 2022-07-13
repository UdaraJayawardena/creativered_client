export class SuperService {

    constructor() {
    }

    public getBaseURL(): string {
        // return 'htt p://3.17.162.128:3000/api';
        // return 'http://localhost:3000/api';
        // return 'http://neominds.lk:3041/api';
        return 'http://192.168.1.2:3000/api';
    }

    public getEmailURL(): string {
        return 'http://192.168.1.105:8050/';
    }

}
