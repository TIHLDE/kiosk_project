import checkAccessToken from "@/lib/token";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const ZETTLE_API_KEY = process.env["ZETTLE_CLIENT_SECRET"];
const ZETTLE_CLIENT_ID = process.env["ZETTLE_CLIENT_ID"];

const GET = async (req: NextRequest) => {
  try {
    const cookieStorage = await cookies();

    const existingAccessToken = cookieStorage.get("zettle_access_token")?.value;

    if(existingAccessToken && checkAccessToken(existingAccessToken)){
      return NextResponse.json({message: "ok"}, {status: 200});
    }
  
    const body = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&client_id=${ZETTLE_CLIENT_ID}&assertion=${ZETTLE_API_KEY}`;

    const response = await fetch('https://oauth.zettle.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body
    });

    const data = await response.json();
    const accessToken = data.access_token!;

    cookieStorage.set("zettle_access_token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7200,
      sameSite: "lax",
    })

    return NextResponse.json({ message: "ok" }, { status: 200 })
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json({ message: "Error" }, { status: 500 });  
  }
};

export {
  GET
};
