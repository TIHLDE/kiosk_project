"use server";

import { NextResponse } from "next/server";
import {
  getAveragePayment,
  mostBoughtProducts as mostBoughtProductsByItems,
  mostBoughtProductsByRevenue,
  numberOfEnergyDrinksBougt,
  Purchase,
  PurchaseStatistics,
} from "./zettle_data";
import { getAccessToken } from "@/app/server/token";
import { fetchPurchases } from "@/app/server/zettle";

export async function GET() {
  // Get the access token
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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

  return NextResponse.json({
    endDate: new Date(),
    startDate: startDate,
    numberOfPurchases: purchaseData.length,
    averagePayment: getAveragePayment(purchaseData),
    mostSoldProductsByItems: mostBoughtProductsByItems(purchaseData),
    mostSoldProductsByRevenue: mostBoughtProductsByRevenue(purchaseData),
    numberOfEnergyDrinksSold: numberOfEnergyDrinksBougt(purchaseData),
  } as PurchaseStatistics);
}