import { NextResponse } from "next/server";
import { ShoppingBag } from "lucide-react"; // Just for icons if needed, not logic
import { generateOrderEmail } from "@/utils/emailTemplates";
import useCartStore from "@/stores/cartStore";
import { sendEmail } from "@/lib/mailer";

export async function GET(request: Request) {
  // Pesapal might send a GET request
  const { searchParams } = new URL(request.url);
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const orderMerchantReference = searchParams.get("OrderMerchantReference");

  if (!orderTrackingId || !orderMerchantReference) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // PROCEED TO PROCESS
  await processPaymentUpdate(orderTrackingId, orderMerchantReference);

  // Return a simplified response as required by some IPNs
  const response = {
    orderNotificationType: "IPNCHANGE",
    orderTrackingId: orderTrackingId,
    orderMerchantReference: orderMerchantReference,
    status: 200,
  };

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  // Pesapal might send a POST request
  const body = await request.json();
  const { OrderTrackingId, OrderMerchantReference } = body;

  if (!OrderTrackingId || !OrderMerchantReference) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // PROCEED TO PROCESS
  await processPaymentUpdate(OrderTrackingId, OrderMerchantReference);

  const response = {
    orderNotificationType: "IPNCHANGE",
    orderTrackingId: OrderTrackingId,
    orderMerchantReference: OrderMerchantReference,
    status: 200,
  };

  return NextResponse.json(response);
}

// --- THE CORE LOGIC ---
async function processPaymentUpdate(trackingId: string, reference: string) {
  console.log(`Received IPN for Order: ${reference}, Tracking: ${trackingId}`);

  // STEP 1: Get your Access Token (You likely have a helper function for this)
  const token = await getPesapalAccessToken();

  // STEP 2: Ask Pesapal for the actual status
  // This covers the "GetTransactionStatus" part of the docs
  const getTransactionStatusUrl = `${process.env.PESAPAL_GET_TRANSACTION_STATUS_URL}${trackingId}`;

  if (!getTransactionStatusUrl) {
    return NextResponse.json(
      { error: "Missing getTransactionStatusUrl" },
      { status: 400 }
    );
  }

  const statusRes = await fetch(getTransactionStatusUrl, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const statusData = await statusRes.json();

  // statusData looks like: { payment_status_description: "Completed", status_code: 1, ... }
  console.log("Actual Payment Status:", statusData.payment_status_description);


  if (statusData.payment_status_description === "Completed") {
    // 1. Prepare Data
    const emailData = {
      orderId: reference,
      trackingId: trackingId,
      orderDate: new Date().toDateString(),
      customerName: "shippingInfo.firstName",
      shippingDetails: {
        firstName:"",
        lastName:"",
        email:"",
        phone:"",
        line1:"",
        line2:"",
        city:""
      },
      cartItems: [], // Your cart array from DB
      totalAmount:1.00,
      currency: "KES",
    };
    if (!emailData) {
      return;
    }
    // 2. Generate Customer HTML
    const customerEmailHtml = generateOrderEmail({
      ...emailData,
      recipientType: "customer",
    });

    // 3. Generate Admin HTML
    const adminEmailHtml = generateOrderEmail({
      ...emailData,
      recipientType: "admin",
    });

    // 4. Send Emails (Example using Nodemailer)
    // await sendEmail({
    //   to: shippingInfo.email,
    //   subject: `Order Confirmation - ${reference}`,
    //   html: customerEmailHtml,
    // });

    await sendEmail({
      to: "kevinthuitairungu@gmail.com",
      subject: `[NEW ORDER] ${reference}`,
      html: adminEmailHtml,
    });

    // await OrderModel.findOneAndUpdate({ id: reference }, { status: 'PAID', paymentId: trackingId });
    console.log("Database updated to PAID");
  } else if (statusData.payment_status_description === "Failed") {
    // await OrderModel.findOneAndUpdate({ id: reference }, { status: 'FAILED' });
    console.log("Database updated to FAILED");
  }
}

async function getPesapalAccessToken() {
  // Your existing logic to get the token
  // Ideally, import this from a utils file to avoid duplication
  const url = process.env.PESAPAL_REQUEST_TOKEN_URL!;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      consumer_key: process.env.PESAPAL_CONSUMER_KEY,
      consumer_secret: process.env.PESAPAL_CONSUMER_SECRET,
    }),
  });
  const data = await response.json();
  return data.token;
}
