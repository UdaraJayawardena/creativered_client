export class News {
    header: string;
    newsDate: string;
    newsTime: string;
    description: string;
    image: string;
    status: string;
    item_id: number;
    id: number;

    constructor(header: string, newsDate: string, newsTime: string, description: string, image: string, status: string,
                item_id: number, id: number) {
        this.header = header;
        this.newsDate = newsDate;
        this.newsTime = newsTime;
        this.description = description;
        this.image = image;
        this.status = status;
        this.item_id = item_id;
        this.id = id;
    }
}
