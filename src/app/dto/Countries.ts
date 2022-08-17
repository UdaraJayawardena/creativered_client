export class Countries {
    Note: string;
    Country: string;
    ISO: string;
    Format: string;
    Regex: string;

    constructor(Note: string, Country: string, ISO: string, Format: string, Regex: string) {
        this.Note = Note;
        this.Country = Country;
        this.ISO = ISO;
        this.Format = Format;
        this.Regex = Regex;
    }
}