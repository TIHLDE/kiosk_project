"use server";

import { NextResponse } from "next/server";
import { getAccessToken } from "@/app/api/token/route";

export async function GET() {
  // Get the access token
  const accessToken = await getAccessToken();

  // Set query parameters
  const queryParams = new URLSearchParams({
    limit: "1000",
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
    return NextResponse.json(
      { message: "Could not fetch data" },
      { status: 500 }
    );
  }

  // Parse the response
  const data = await response.json();

  // Calculate the average payment
  const averagePayment = getAveragePayment(data.purchases);

  // Return the average payment
  return NextResponse.json({ averagePayment }, { status: 200 });
}

function getAveragePayment(purchases: { amount: number }[]): number {
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
