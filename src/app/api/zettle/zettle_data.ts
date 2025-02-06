export interface Purchase {
  amount: number;
  purchaseUUID: string;
  vatAmount: number;
  taxAmount: number;
  timestamp: string;
  userId: number;
  products: Product[];
  // discounts: any[];
  payments: Payment[];
}

interface Product {
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
}

interface Payment {
  uuid: string;
  amount: number;
  createdAt?: string;
  attributes: PaymentAttributes;
}

interface PaymentAttributes {
  cardType: string;
  cardPaymentEntryMode: string;
}

export interface PurchaseData {
  purchases: Purchase[];
}

interface ProductCount {
  name: string;
  quantity: number;
}

// interface ProductRevenue {
//   name: string;
//   amount: number;
// }

export interface PurchaseStatistics {
  startDate: Date;
  endDate: Date;
  numberOfPurchases: number;
  averagePayment: number;
  mostSoldProductsByItems: ProductCount[];
  // mostSoldProductsByRevenue: ProductRevenue[];
  numberOfEnergyDrinksSold: number;
}

export function getAveragePayment(purchases: Purchase[]): number {
  if (!purchases || purchases.length === 0) {
    return 0;
  }

  // Sum all the payments
  const totalAmount =
    purchases.reduce((sum, purchase) => {
      // Assuming each purchase has only one payment
      const paymentAmount = purchase.amount;
      return sum + paymentAmount;
    }, 0) / 100;

  // Calculate the average payment
  const averageAmount = totalAmount / purchases.length;

  // Round to 2 decimal places
  return Math.round(averageAmount * 100) / 100;
}

export function mostBoughtProducts(purchases: Purchase[]): ProductCount[] {
  const productCounts = purchases.reduce((acc, purchase) => {
    purchase.products.forEach((product) => {
      const name = product.name;
      acc[name] = (acc[name] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  // Convert the object to an array of [productName, count] pairs
  const productArray = Object.entries(productCounts);

  // Sort the array in descending order based on the count
  productArray.sort((a, b) => b[1] - a[1]);

  return productArray.map(
    ([name, quantity]) => ({ name, quantity } as ProductCount)
  );
}

// export function mostBoughtProductsByRevenue(
//   purchases: Purchase[]
// ): ProductRevenue[] {
//   const products = purchases.reduce((acc, purchase) => {
//     purchase.products.forEach((product) => {
//       const name = product.name;
//       const amount = product.grossValue / 100;
//       acc[name] = acc[name] ? acc[name] + amount : amount;
//     });
//     return acc;
//   }, {} as Record<string, number>);

//   // Convert the object to an array of [productName, amount] pairs
//   const productArray = Object.entries(products);

//   // Sort the array in descending order based on the amount
//   productArray.sort((a, b) => b[1] - a[1]);

//   return productArray.map(
//     ([name, amount]) => ({ name, amount } as ProductRevenue)
//   );
// }

export function numberOfEnergyDrinksBougt(purchases: Purchase[]): number {
  return purchases.reduce((acc, purchase) => {
    return (
      acc +
      purchase.products.reduce((acc, product) => {
        const name = product.name.toLowerCase();
        const isEnergyDrink =
          name.includes("monster") ||
          name.includes("red bull") ||
          name.includes("rockstar") ||
          name.includes("battery") ||
          name.includes("powerking");

        return acc + (isEnergyDrink ? 1 : 0);
      }, 0)
    );
  }, 0);
}
