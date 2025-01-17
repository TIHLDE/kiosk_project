"use server";

import { NextResponse } from "next/server";
import { getAccessToken } from "@/app/api/token/route";
import {
  getAveragePayment,
  mostBoughtProducts as mostBoughtProductsByItems,
  mostBoughtProductsByRevenue,
  numberOfEnergyDrinksBougt,
  PurchaseData,
  PurchaseStatistics,
} from "./zettle_data";

export async function GET() {
  // Get the access token
  const accessToken = await getAccessToken();

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Set query parameters
  const queryParams = new URLSearchParams({
    descending: "true",
  }).toString();

  // Fetch the data
  const response = await fetch(
    "https://purchase.izettle.com/purchases/v2?" + queryParams,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  // Check if the request was successful
  if (response.status !== 200) {
    console.error("Failed to fetch data");
    throw new Error("Failed to fetch data");
  }

  // Parse the response
  const data = (await response.json()) as PurchaseData;

  return NextResponse.json({
    averagePayment: getAveragePayment(data.purchases),
    mostSoldProductsByItems: mostBoughtProductsByItems(data.purchases),
    mostSoldProductsByRevenue: mostBoughtProductsByRevenue(data.purchases),
    numberOfEnergyDrinksSold: numberOfEnergyDrinksBougt(data.purchases),
  } as PurchaseStatistics);
}
