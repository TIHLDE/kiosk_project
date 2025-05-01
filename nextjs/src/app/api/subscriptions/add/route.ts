import { getAccessToken, getSelf } from "../../../server/token";
import { v1 as uuidv1 } from 'uuid';

export async function GET(){

  try{
    const access_token = await getAccessToken();
    const self: {uuid: string, organizationUuid: string} = await getSelf()

    const response = await fetch(`https://pusher.izettle.com/organizations/${self.organizationUuid}/subscriptions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        destination: 'https://kiosken.tihlde.org/api/zettle-webhook', // Your Next.js API route
        eventNames: ['PurchaseCreated'], // Adjust based on Zettle event names
        transportName: 'WEBHOOK',
        uuid: uuidv1(),
        organizationUuid: self.organizationUuid,
        contactEmail: 'driftsminister@tihlde.org'
      }),
    });

    const data = await response.json();

    return new Response(JSON.stringify({ success: true, data }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}