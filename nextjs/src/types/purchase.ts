import { Payment } from "./payment";
import { Product, ProductCount } from "./product";


export type Purchase = {
    amount: number;
    purchaseUUID: string;
    vatAmount: number;
    taxAmount: number;
    timestamp: string;
    userId: number;
    products: Product[];
    payments: Payment[];
};

export type PurchaseData = {
    purchases: Purchase[];
};

export type PurchaseStatistics = {
  startDate: Date;
  endDate: Date;
  numberOfPurchases: number;
  averagePayment: number;
  mostSoldProductsByItems: ProductCount[];
  numberOfEnergyDrinksSold: number;
}