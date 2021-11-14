export enum Rating {
    EXCELENT = "Excelent",
    REGULAR = "Regular",
    BAD = "Bad"
}

export interface Comment {
    rating: string;
    comment: string;
    email?: string;
    id?: string;
    userId?: string;
}