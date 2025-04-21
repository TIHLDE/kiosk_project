import { getAccessToken } from "../../../server/token";
import { getSelf } from "../../../server/token";
import { v1 as uuidv1 } from 'uuid';

export async function POST(){
  const access_token = await getAccessToken();
  const self: {uuid: string, organizationUuid: string} = await getSelf()

  const response = await fetch(`https://pusher.izettle.com/organizations/${self.organizationUuid}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      destination: 'https://dev-kiosken.tihlde.org/webhook', // Your Next.js API route
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
}