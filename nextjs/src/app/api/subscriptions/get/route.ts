import { getAccessToken, getSelf } from "../../../server/token";

export async function GET(){

  try{
    const access_token = await getAccessToken();
    const self: {uuid: string, organizationUuid: string} = await getSelf();

    const response = await fetch(`https://pusher.izettle.com/organizations/${self.organizationUuid}/subscriptions`, {
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
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}