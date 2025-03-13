import { Purchase, PurchaseEvent } from "@/types/types";


export async function POST(req: Request) {
  try {
    const event: PurchaseEvent = await req.json();
    console.log("Received Zettle Webhook:", event);

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
