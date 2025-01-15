import { cookies } from "next/headers";
import Jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const ZETTLE_API_KEY = process.env["ZETTLE_CLIENT_SECRET"];
const ZETTLE_CLIENT_ID = process.env["ZETTLE_CLIENT_ID"];

export default function checkAccessToken(token: string) {
  try {
    // Decode the token without verifying the signature
    const decoded = Jwt.decode(token) as { exp?: number };

    if (!decoded || typeof decoded.exp !== "number") {
      throw new Error("Could not decode token");
    }

    // Check if the current time is before the expiration time
    const currentTime = Math.floor(Date.now() / 1000);
    return currentTime < decoded.exp;
  } catch (error) {
    // If an error occurs during decoding, consider the token invalid
    console.error(error);
    return false;
  }
}

const GET = async () => {
  try {
    const cookieStorage = await cookies();

    const existingAccessToken = cookieStorage.get("zettle_access_token")?.value;

    if (existingAccessToken && checkAccessToken(existingAccessToken)) {
      return NextResponse.json({ message: "ok" }, { status: 200 });
    }

    if (!ZETTLE_API_KEY || !ZETTLE_CLIENT_ID) {
      return NextResponse.json(
        { message: "Missing Zettle API key or client ID" },
        { status: 500 }
      );
    }

    const params = new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      client_id: ZETTLE_CLIENT_ID!,
      assertion: ZETTLE_API_KEY!,
    }).toString();

    const response = await fetch("https://oauth.zettle.com/token?" + params, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const data = await response.json();
    const accessToken = data.access_token!;

    cookieStorage.set("zettle_access_token", accessToken);

    return NextResponse.json({ message: "ok" }, { status: 200 });
  } catch (error) {
    console.error("Error fetching token:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
};

export { GET };
