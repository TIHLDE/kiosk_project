"use server"

import { getAccessToken } from "../../../server/token";
import { fetchPurchases } from "../../../server/zettle";

export async function GET(){
  const accessToken = await getAccessToken();
  const startDate = new Date();
  const endDate = new Date();
  startDate.setDate(startDate.getDate() - 1);

  const data = await fetchPurchases(startDate, endDate, accessToken);

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}