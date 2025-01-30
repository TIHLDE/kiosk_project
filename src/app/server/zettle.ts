"use server";
import {
  Purchase,
  getAveragePayment,
  mostBoughtProducts,
  mostBoughtProductsByRevenue,
  numberOfEnergyDrinksBougt,
} from "../api/zettle/zettle_data";
import { fetchPurchases } from "@/app/api/zettle/route";
import { getAccessToken } from "../utils/token";

export async function getPurchaseStats() {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return null;
  }
  // Fetch the data
  let purchaseData: Purchase[] = [];

  let endDate = new Date();
  let startDate = new Date(endDate.valueOf() - 10 * 24 * 60 * 60 * 1000);
  const promises: Promise<Purchase[]>[] = [];

  for (let i = 0; i < 20; i++) {
    promises.push(fetchPurchases(startDate, endDate, accessToken));

    // Wait 0.1 seconds
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Decrement date by 10 days
    endDate = startDate;
    startDate = new Date(startDate.valueOf() - 10 * 24 * 60 * 60 * 1000);
  }

  const results = await Promise.all(promises);

  results.forEach((purchases) => {
    purchaseData = purchaseData.concat(purchases);
  });

  return {
    endDate: new Date(),
    startDate: startDate,
    numberOfPurchases: purchaseData.length,
    averagePayment: getAveragePayment(purchaseData),
    mostSoldProductsByItems: mostBoughtProducts(purchaseData),
    mostSoldProductsByRevenue: mostBoughtProductsByRevenue(purchaseData),
    numberOfEnergyDrinksSold: numberOfEnergyDrinksBougt(purchaseData),
  };
}
