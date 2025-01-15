"use server";

import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import checkAccessToken from "../token/route";

export async function GET() {
  const cookieStorage = await cookies();

  const accessToken = cookieStorage.get("zettle_access_token");

  checkAccessToken(accessToken!.value);

  console.log(accessToken);

  const response = await fetch("https://purchase.izettle.com/purchases/v2", {
    headers: {
      Authorization: `Bearer ${accessToken?.value}`,
    },
  });

  const data = await response.json();

  return NextResponse.json(data);
}

export interface PurchaseHistory {}
