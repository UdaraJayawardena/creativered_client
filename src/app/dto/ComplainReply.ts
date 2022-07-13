export class ComplainReply {
    replyDate: string;
    replyTime: string;
    message: string;
    id: number;
    complainID: number;
    complainUserID: number;

    constructor(replyDate: string, replyTime: string, message: string, id: number, complainID: number, complainUserID: number) {
        this.replyDate = replyDate;
        this.replyTime = replyTime;
        this.message = message;
        this.id = id;
        this.complainID = complainID;
        this.complainUserID = complainUserID;
    }
}
