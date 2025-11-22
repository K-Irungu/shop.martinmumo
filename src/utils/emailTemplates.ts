import { ProductType } from "@/types"; // Assuming you have this type, otherwise define inline

interface CartItem extends ProductType {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  country?: string;
}

interface EmailParams {
  recipientType: "admin" | "customer";
  orderId: string; // The Merchant Reference
  trackingId: string; // The Pesapal Tracking ID
  orderDate: string;
  customerName: string;
  shippingDetails: ShippingDetails;
  cartItems: CartItem[];
  totalAmount: number;
  currency: string;
}

export function generateOrderEmail({
  recipientType,
  orderId,
  trackingId,
  orderDate,
  customerName,
  shippingDetails,
  cartItems,
  totalAmount,
  currency,
}: EmailParams) {
  const isCustomer = recipientType === "customer";
  
  // 1. Dynamic Content based on recipient
  const subjectLine = isCustomer 
    ? `Order Confirmation - ${orderId}` 
    : `[NEW ORDER] ${orderId} - ${currency} ${totalAmount}`;

  const greeting = isCustomer
    ? `Dear <strong>${customerName}</strong>,<br /><br />Thank you for your order! We are thrilled to confirm that we have received your payment and are processing your order.`
    : `Hello <strong>Admin</strong>,<br /><br />You have received a new order from <strong>${customerName}</strong>. Payment has been confirmed via Pesapal.`;

  const subText = isCustomer
    ? `Your order details are listed below. You will receive another email once your items have shipped.`
    : `Please prepare the items below for dispatch.`;

  // 2. Helper to generate the Cart Rows
  const cartRows = cartItems
    .map((item) => {
      const variantInfo = [];
      if (item.selectedSize) variantInfo.push(`Size: ${item.selectedSize}`);
      if (item.selectedColor) variantInfo.push(`Color: ${item.selectedColor}`);
      
      return `
        <tr>
          <td style="padding: 12px; border-bottom: 1px solid #eee; font-size: 14px;">
            <strong>${item.name}</strong>
            ${variantInfo.length > 0 ? `<br/><span style="font-size: 12px; color: #777;">${variantInfo.join(" | ")}</span>` : ""}
          </td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: center; font-size: 14px;">${item.quantity}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-size: 14px;">${currency} ${item.price.toLocaleString()}</td>
          <td style="padding: 12px; border-bottom: 1px solid #eee; text-align: right; font-size: 14px; font-weight: bold;">${currency} ${(item.price * item.quantity).toLocaleString()}</td>
        </tr>
      `;
    })
    .join("");

  // 3. The HTML Template
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subjectLine}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f4f4; color: #333;">

  <!-- MAIN CONTAINER -->
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <!-- HEADER -->
          <tr>
            <td style="background-color: #1a1a1a; padding: 30px; text-align: center;">
              <!-- REPLACE WITH YOUR ABSOLUTE IMAGE URL -->
              <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: 1px;">MARTIN MUMO HOME</h1>
            </td>
          </tr>

          <!-- BODY CONTENT -->
          <tr>
            <td style="padding: 40px;">
              <h2 style="margin-top: 0; color: #1a1a1a;">${isCustomer ? "Order Confirmed" : "New Order Received"}</h2>
              <p style="font-size: 16px; line-height: 1.6; color: #555;">
                ${greeting}
              </p>
              <p style="font-size: 16px; line-height: 1.6; color: #555;">
                ${subText}
              </p>

              <!-- ORDER INFO BOX -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9f9f9; border-radius: 4px; margin: 20px 0; border: 1px solid #eee;">
                <tr>
                  <td style="padding: 15px;">
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Order Reference:</strong> ${orderId}</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Date:</strong> ${orderDate}</p>
                    <p style="margin: 5px 0; font-size: 14px;"><strong>Payment ID:</strong> ${trackingId}</p>
                    <p style="margin: 5px 0; font-size: 14px; color: green;"><strong>Status:</strong> Paid</p>
                  </td>
                </tr>
              </table>

              <!-- CART ITEMS TABLE -->
              <h3 style="border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px;">Order Summary</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse;">
                <thead>
                  <tr style="background-color: #f9f9f9;">
                    <th style="padding: 12px; text-align: left; font-size: 12px; text-transform: uppercase; color: #777;">Item</th>
                    <th style="padding: 12px; text-align: center; font-size: 12px; text-transform: uppercase; color: #777;">Qty</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #777;">Price</th>
                    <th style="padding: 12px; text-align: right; font-size: 12px; text-transform: uppercase; color: #777;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${cartRows}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; border-top: 2px solid #eee;">Subtotal</td>
                    <td style="padding: 15px; text-align: right; font-weight: bold; border-top: 2px solid #eee;">${currency} ${totalAmount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colspan="3" style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; color: #1a1a1a;">TOTAL</td>
                    <td style="padding: 15px; text-align: right; font-weight: bold; font-size: 18px; color: #1a1a1a;">${currency} ${totalAmount.toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>

              <!-- SHIPPING DETAILS -->
              <h3 style="border-bottom: 2px solid #eee; padding-bottom: 10px; margin-top: 30px;">Shipping Details</h3>
              <p style="font-size: 14px; line-height: 1.6; color: #555;">
                <strong>${shippingDetails.firstName} ${shippingDetails.lastName}</strong><br/>
                ${shippingDetails.email} | ${shippingDetails.phone}<br/>
                ${shippingDetails.line1}<br/>
                ${shippingDetails.line2 ? `${shippingDetails.line2}<br/>` : ""}
                ${shippingDetails.city}
              </p>

            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #999;">
              <p>&copy; ${new Date().getFullYear()} Martin Mumo Home. All rights reserved.</p>
              <p>
                <a href="#" style="color: #999; text-decoration: underline;">Privacy Policy</a> | 
                <a href="#" style="color: #999; text-decoration: underline;">Terms of Service</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}