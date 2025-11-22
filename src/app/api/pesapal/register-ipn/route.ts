// app/api/pesapal/register-ipn/route.js
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { authToken, ipn_notification_type } = await req.json();
  const ipnRegistrationUrl = process.env.PESAPAL_REGISTER_IPN_URL;
  const baseUrl = process.env.NEXT_PUBLIC_NGROK_URL;
  const notificationEndpoint = process.env.PESAPAL_NOTIFICATION_ENDPOINT;
  const url = `${baseUrl}` + `${notificationEndpoint}`;

  //   Validation checks
  if (!authToken || !url || !ipn_notification_type) {
    return NextResponse.json({
      status: 404,
      message: "authToken, url or ipn_notification_type missing ",
      data: null,
    });
  }

  if (!ipnRegistrationUrl) {
    return NextResponse.json({
      status: 404,
      message: "ipnRegistrationUrl not found or is not in env",
      data: null,
    });
  }

  try {
    const response = await fetch(ipnRegistrationUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        url,
        ipn_notification_type,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          status: data.status,
          message: data.message,
          data: null,
        },
        { status: data.status }
      );
    }

    return NextResponse.json({
      status: data.status,
      message: data.message,
      data: {
        ipn_id: data.ipn_id,
      },
    });
  } catch (err: any) {
    console.error("Pesapal RegisterIPN Error:", err);
    return NextResponse.json(
      { error: err.message || "Unknown error" },
      { status: 500 }
    );
  }
}
