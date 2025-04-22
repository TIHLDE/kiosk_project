"use server";

import Jwt from "jsonwebtoken";

const ZETTLE_CLIENT_SECRET = process.env["ZETTLE_CLIENT_SECRET"];
const ZETTLE_CLIENT_ID = process.env["ZETTLE_CLIENT_ID"];
let AccessToken = "";

interface AuthResponse {
  access_token: string;
  expires_in: number;
}

function isAccessTokenValid(token: string) {
  try {
    // Decode the token without verifying the signature
    const decoded = Jwt.decode(token) as { exp?: number };

    if (!decoded || typeof decoded.exp !== "number") {
      return false;
    }

    // Check if the current time + 5 min is before the expiration time
    const gracePeriod = 300; // seconds
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime + gracePeriod < decoded.exp;
  } catch {
    return false;
  }
}

export const getAccessToken = async (): Promise<string> => {
  if (AccessToken && isAccessTokenValid(AccessToken)) {
    return AccessToken;
  }

  if (!ZETTLE_CLIENT_ID || !ZETTLE_CLIENT_SECRET) {
    console.log("Missing ZETTLE_CLIENT_ID or ZETTLE_CLIENT_SECRET environment variables");
  }

  const response = await fetch("https://oauth.zettle.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      client_id: ZETTLE_CLIENT_ID!,
      assertion: ZETTLE_CLIENT_SECRET!,
    }),
    cache: "no-store",
  });

  if (response.status !== 200) {
    console.error(response);
    throw Error("Failed to get a new access token");
  }

  const data = (await response.json()) as AuthResponse;
  const accessToken = data.access_token;

  AccessToken = accessToken;

  return accessToken;
};

export const getSelf = async (): Promise<{uuid: string, organizationUuid: string}> => {
  const accessToken = await getAccessToken();

  const response = await fetch("https://oauth.zettle.com/users/self", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (response.status !== 200) {
    console.error(response);
    throw Error("Failed to get a new access token");
  }

  const data = (await response.json());

  console.log(data);

  return(data);

};