"use server"

import { getAccessToken } from "../../../server/token";
import { fetchPurchases } from "../../../server/zettle";
import { Purchase } from "../../../../types";

export async function GET(){
  const accessToken = await getAccessToken();

// Fetch the data
  let data: any = [];

  let endDate = new Date();
  let startDate = new Date(endDate.valueOf() - 10 * 24 * 60 * 60 * 1000);
  const targetDate = new Date(2025, 0, 1);

  const promises: Promise<any>[] = [];

  while (startDate > targetDate) {
    promises.push(fetchPurchases(startDate, endDate, accessToken));

    // Wait 0.1 seconds
    await new Promise((resolve) => setTimeout(resolve, 50));

    // Decrement date by 10 days
    endDate = startDate;
    startDate = new Date(startDate.valueOf() - 10 * 24 * 60 * 60 * 1000);
  }

  const results = await Promise.all(promises);

  results.forEach((result) => {
    data = data.concat(result.purchases);
  });

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}