import { Purchase } from "@/types";
import { PurchaseEventMessage } from "./zettle_request";

export async function POST(req: any) {
  try {
    const event: PurchaseEventMessage = await req.json();

    const payload: Purchase = await JSON.parse(event.payload);

    console.log(payload);
    
    // Send payload through websocket here

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
