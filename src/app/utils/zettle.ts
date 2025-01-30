import type { Purchase, PurchaseData } from "../api/zettle/zettle_data";

export async function fetchPurchases(
    startDate: Date,
    endDate: Date,
    accessToken: string
  ): Promise<Purchase[]> {
  
    // Set query parameters
    const queryParams = new URLSearchParams({
      descending: "true",
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    }).toString();
  
    const response = await fetch(
      "https://purchase.izettle.com/purchases/v2?" + queryParams,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    // Check if the request was successful
    if (response.status !== 200) {
      console.error("Failed to fetch data");
      console.error(await response.text());
      throw new Error("Failed to fetch data");
    }
  
    // Parse the response
    const data = (await response.json()) as PurchaseData;
  
    return data.purchases;
  }
  