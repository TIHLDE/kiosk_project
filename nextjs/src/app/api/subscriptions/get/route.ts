import { getAccessToken, getSelf } from "../../../server/token";

export async function GET(){
  const access_token = await getAccessToken();
  const self: {uuid: string, organizationUuid: string} = await getSelf();

  const response = await fetch(`https://pusher.izettle.com/organizations/${self}/subscriptions`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await response.json();

  return new Response(JSON.stringify({ success: true, data }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}