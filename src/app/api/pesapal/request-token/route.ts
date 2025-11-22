// app/api/pesapal/request-token/route.js
// This route needs to be protected
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const requestTokenUrl = process.env.PESAPAL_REQUEST_TOKEN_URL;
  const key = process.env.PESAPAL_CONSUMER_KEY;
  const secret = process.env.PESAPAL_CONSUMER_SECRET;

  //   Validation check
  if (!requestTokenUrl || !key || !secret) {
    return NextResponse.json({
      status: 404,
      message: "requestTokenUrl, key or secret missing",
      data: null,
    });
  }


  try {
    const response = await fetch(requestTokenUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consumer_key: key,
        consumer_secret: secret,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        status: data.status,
        message: data.message,
        data: null,
        error: data.error,
      });
    }

    return NextResponse.json({
      status: data.status,
      message: data.message,
      data: {
        token: data.token,
      },
    });

  } catch (err: any) {
    console.error("Pesapal RequestToken Error:", err);
    return NextResponse.json({
      status: 500,
      message: err.message || "Unknown Error",
      data: null,
    });
  }
}
