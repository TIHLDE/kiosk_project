import { getAccessToken, getSelf } from "../../../server/token";

export async function POST(request: any) {
  // try {
  //   const { subscriptionIds } = await request.json(); // Parse JSON body

  //   // Validate that subscriptionIds is an array
  //   if (!Array.isArray(subscriptionIds) || subscriptionIds.length === 0) {
  //     return new Response(
  //       JSON.stringify({ success: false, error: "Invalid or empty subscriptionIds" }),
  //       {
  //         status: 400,
  //         headers: { "Content-Type": "application/json" },
  //       }
  //     );
  //   }

  //   const self = await getSelf();
  //   const access_token = await getAccessToken();

  //   // Use Promise.all to handle multiple async requests
  //   await Promise.all(
  //     subscriptionIds.map(async (subscription: string) => {
  //       const response = await fetch(
  //         `https://pusher.izettle.com/organizations/${self.organizationUuid}/subscriptions/${subscription}`,
  //         {
  //           method: "DELETE", // Use DELETE method
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error(`Failed to delete subscription: ${subscription}`);
  //       }
  //     })
  //   );

  //   return new Response(JSON.stringify({ success: true, subscriptionIds }), {
  //     status: 200,
  //     headers: { "Content-Type": "application/json" },
  //   });
  // } catch (error) {
  //   console.error("Error deleting subscriptions:", error);
  //   return new Response(
  //     JSON.stringify({ success: false, error: error || "Internal Server Error" }),
  //     {
  //       status: 500,
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  // }
  return
}