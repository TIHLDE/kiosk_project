"use server"
import { Purchase } from "../../../../../types";
import purchaseData from "../../../../../lib/purchase_data.json";

export async function GET(){
  let data = purchaseData;

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}