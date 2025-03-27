import { getAccessToken, getSelf } from "@/app/server/token";
import { v1 as uuidv1 } from 'uuid';

const registerWebhook = async () => {
  const access_token = await getAccessToken();
  const self: {uuid: string, organizationUuid: string} = await getSelf()

  const response = await fetch(`https://pusher.izettle.com/organizations/${self.organizationUuid}/subscriptions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${access_token}`,
    },
    body: JSON.stringify({
      destination: 'https://dev-kiosken.tihlde.org/api/zettle-webhook', // Your Next.js API route
      eventNames: ['PurchaseCreated'], // Adjust based on Zettle event names
      transportName: 'WEBHOOK',
      uuid: uuidv1(),
      organizationUuid: self.organizationUuid,
      contactEmail: 'driftsminister@tihlde.org'
    }),
  });

  const data = await response.json();
  console.log(data);
};

export default function page(){
  registerWebhook();
}