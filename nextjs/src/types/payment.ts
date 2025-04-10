
export type PaymentAttributes = {
    cardType: string;
    cardPaymentEntryMode: string;
};

export type Payment = {
    uuid: string;
    amount: number;
    createdAt?: string;
    attributes: PaymentAttributes;
};
