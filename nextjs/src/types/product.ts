

export type Product = {
    quantity: string;
    productUuid: string;
    unitPrice: number;
    costPrice: number;
    rowTaxableAmount: number;
    name: string;
    id: string;
    grossValue: number;
    grossTax: number;
    details: Record<string, unknown>;
};

export type ProductCount = {
    name: string;
    quantity: number;
};