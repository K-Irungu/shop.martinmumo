// app/api/pesapal/submit-order/route.js
import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  // 1. Grab exactly what the client is sending
  const { authToken, ipnId, orderPayload } = await req.json();
  const submitOrderUrl = process.env.PESAPAL_SUBMIT_ORDER_URL;

  if (!authToken || !ipnId || !orderPayload || !submitOrderUrl) {
    return NextResponse.json({
      status: 404,
      message: "authToken, ipnId, orderPayload or submitOrderUrl missing",
    });
  }

  // 2. Generate uuid for the order
  const orderId = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    }
  );

  // 3. Build the Pesapal payload
  const payload = {
    id: orderId,
    currency: "KES",
    // amount: orderPayload.amount,
    amount: 1.00,
    description: "Payment for Beyond the Summit Pre-order",
    callback_url: `${process.env.NEXT_PUBLIC_NGROK_URL}response`,
    redirect_mode: "TOP_WINDOW",
    notification_id: ipnId,
    // "branch": "Store Name - HQ",
    billing_address: {
      email_address: orderPayload.email_address,
      phone_number: orderPayload.phone_number,
      country_code: "KE",
      first_name: orderPayload.first_name,
      middle_name: "",
      last_name: orderPayload.last_name,
      line_1: orderPayload.line_1,
      line_2: orderPayload.line_2,
      city: orderPayload.city,
      //   state: bookingDetails.customerState || "",
      //   postal_code: bookingDetails.customerPostal || "",
      //   zip_code: bookingDetails.customerZip || "",
    },
  };

  //   4. Sever to server call
  try {
    const response = await fetch(submitOrderUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({
        status: data.status,
        message: "Error encountered when submitting order",
        data: null,
        error: data.error,
      });
    }

    // Send email to admin
     // Send email to customer
    // await sendEmail(orderPayload.email_address);


    return NextResponse.json({
      status: data.status,
      message: "Order submitted successfully",
      data: {
        order_tracking_id: data.order_tracking_id,
        merchant_reference: data.merchant_reference,
        redirect_url: data.redirect_url
      },
    });
  } catch (err) {
    console.error("SubmitOrderRequest Error:", err);

    const errorMessage = err instanceof Error ? err.message : "Unknown error";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
