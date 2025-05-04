import { Purchase } from "../../../types";

export async function POST(req: any) {
  try {
    const event = await req.json();
    
    // Send payload through websocket here
    const response = await fetch(`http://${process.env.NEXT_PUBLIC_URL}:${process.env.PUBLIC_PORT}/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: event.payload,
    });

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
