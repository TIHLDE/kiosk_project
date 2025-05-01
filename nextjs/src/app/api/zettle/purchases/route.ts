"use server"

import { getAccessToken } from "../../../server/token";
import { fetchPurchases } from "../../../server/zettle";

export async function GET(){
  const accessToken = await getAccessToken();
  const startDate = new Date(2025, 0, 1); // Months are 0-indexed, Days are not
  const endDate = new Date();

  const data = await fetchPurchases(startDate, endDate, accessToken);

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}