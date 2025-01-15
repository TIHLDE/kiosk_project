'use server'

import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest){
  const cookieStorage = await cookies();

  const accessToken = cookieStorage.get("zettle_access_token");

  console.log(accessToken);

  const response = await fetch('https://purchase.izettle.com/purchases/v2', {
    headers: {
      "Authorization": `Bearer ${accessToken?.value}`
    }
  });

  const data = await response.json();

  return NextResponse.json(data);
}