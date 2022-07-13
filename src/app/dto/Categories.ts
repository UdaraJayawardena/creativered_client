export class Categories {
    category: string;
    id: number;

    constructor(category: string)
    constructor(category: string, id: number)
    constructor(category?: string, id?: number) {
        this.category = category;
        this.id = id;
    }
}
