"use server";

import {
  Purchase,
  PurchaseData,
  getAveragePayment,
  mostBoughtProducts,
  numberOfEnergyDrinksBougt as numberOfEnergyDrinksBought,
  // numberOfEnergyDrinksBougt,
} from "../api/zettle/zettle_data";
import { getAccessToken } from "./token";

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
    // mostSoldProductsByRevenue: mostBoughtProductsByRevenue(purchaseData),
    numberOfEnergyDrinksSold: numberOfEnergyDrinksBought(purchaseData),
  };
}

export async function fetchPurchases(
  startDate: Date,
  endDate: Date,
  accessToken: string
): Promise<Purchase[]> {
  // Set query parameters
  const queryParams = new URLSearchParams({
    descending: "true",
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  }).toString();

  const response = await fetch(
    "https://purchase.izettle.com/purchases/v2?" + queryParams,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  // Check if the request was successful
  if (response.status !== 200) {
    console.error("Failed to fetch data");
    console.error(await response.text());
    throw new Error("Failed to fetch data");
  }

  // Parse the response
  const data = (await response.json()) as PurchaseData;

  return data.purchases;
}
