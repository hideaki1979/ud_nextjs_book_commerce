export type BookType = {
    id: string;
    title: string;
    content: string;
    price: number;
    thumbnail: { url: string };
    createdAt: string;
    updatedAt: string;
}

export type PurchaseType = {
    id: string;
    userId: string;
    bookId: string;
    createdAt: string;
}