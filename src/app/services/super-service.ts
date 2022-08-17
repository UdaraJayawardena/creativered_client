export class SuperService {

    constructor() {
    }

    public getBaseURL(): string {
        // return 'http://localhost:3000/api';
        return 'http://ec2-3-111-113-150.ap-south-1.compute.amazonaws.com:3000/api';
    }

    public getEmailURL(): string {
        // return 'http://localhost:3000/';
        return 'http://ec2-3-111-113-150.ap-south-1.compute.amazonaws.com:3000/';
    }

}
