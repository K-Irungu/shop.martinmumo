import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const orderTrackingId = searchParams.get("orderTrackingId");

  if (!orderTrackingId) {
    return NextResponse.json({ error: "Missing OrderTrackingId" }, { status: 400 });
  }

  try {
    // 1. Get Access Token (Import your helper function here)
    const token = await getPesapalAccessToken(); 

    // 2. Ask Pesapal for status
    const URL = `${process.env.PESAPAL_GET_TRANSACTION_STATUS_URL}${orderTrackingId}`;
    
    console.log(URL)

    
    const res = await fetch(URL, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    return NextResponse.json({
      status: data.payment_status_description, // "Completed", "Failed", "Pending"
      payment_method: data.payment_method,
      currency: data.currency,
      amount: data.amount,
    });

  } catch (error) {
    console.error("Status check failed:", error);
    return NextResponse.json({ error: "Failed to check status" }, { status: 500 });
  }
}

// --- HELPER (Copy your token logic here or import it) ---
async function getPesapalAccessToken() {
    // Your existing logic to get the token
    // Ideally, import this from a utils file to avoid duplication
    const url = process.env.PESAPAL_REQUEST_TOKEN_URL!;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        body: JSON.stringify({
            consumer_key: process.env.PESAPAL_CONSUMER_KEY,
            consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
        }),
    });
    const data = await response.json();
    return data.token;
}