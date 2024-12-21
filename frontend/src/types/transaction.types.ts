export interface Transaction {
    _id?: string;
    userId?: string;
    description: string;
    paymentType: string;
    category: string;
    amount: number;
    location: string;
    date: string;
}
