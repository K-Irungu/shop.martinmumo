"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import {
  CheckCircle2,
  XCircle,
  Loader2,
  ShoppingBag,
  Home,
} from "lucide-react";
import Link from "next/link";
import useCartStore from "@/stores/cartStore";

interface PaymentDetails {
  payment_method: string;
  currency: string;
  amount: number;
  status: string;
}

const ResponseContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderTrackingId = searchParams.get("OrderTrackingId");
  const { clearCart } = useCartStore(); // Assuming you want to clear cart on success

  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading"
  );
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  useEffect(() => {
    if (!orderTrackingId) {
      setStatus("failed");
      return;
    }

    const checkStatus = async () => {
      try {
        const response = await fetch(
          `/api/pesapal/get-transaction-status?orderTrackingId=${orderTrackingId}`
        );
        const data = await response.json();

        if (data.status === "Completed") {
          setStatus("success");
        } else if (data.status === "Failed") {
          setStatus("failed");
        } else {
          // If "Pending", you might want to show a processing state or just success
          // Usually "Completed" is the only safe "Success" state.
          setStatus("failed");
        }
        clearCart(); // Clear the cart

        setPaymentDetails(data);
      } catch (error) {
        console.error("Error checking status:", error);
        setStatus("failed");
      }
    };

    checkStatus();
  }, [orderTrackingId, clearCart]);

  return (
    <div className="min-h-[600px] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* --- LOADING STATE --- */}
        {status === "loading" && (
          <div className="p-12 flex flex-col items-center text-center gap-4">
            <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
            <h2 className="text-xl font-semibold text-gray-800">
              Verifying Payment...
            </h2>
            <p className="text-gray-500">
              Please wait while we confirm your transaction.
            </p>
          </div>
        )}

        {/* --- SUCCESS STATE --- */}
        {status === "success" && (
          <div className="flex flex-col">
            <div className="bg-green-50 p-8 flex flex-col items-center text-center gap-4 border-b border-green-100">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Successful!
                </h2>
                <p className="text-green-700 font-medium mt-1">
                  Thank you for your order.
                </p>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-4">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Payment Method</span>
                  <span className="font-medium">
                    {paymentDetails?.payment_method || "Pesapal"}
                  </span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-gray-500">Amount Paid</span>
                  <span className="font-medium">
                    {paymentDetails?.currency} {paymentDetails?.amount}
                  </span>
                </div>
                <div className="flex justify-between pb-2">
                  <span className="text-gray-500">Tracking ID</span>
                  <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                    {orderTrackingId}
                  </span>
                </div>
              </div>

              <Link
                href="/"
                className="mt-4 w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Continue Shopping
              </Link>
            </div>
          </div>
        )}

        {/* --- FAILED STATE --- */}
        {status === "failed" && (
          <div className="flex flex-col">
            <div className="bg-red-50 p-8 flex flex-col items-center text-center gap-4 border-b border-red-100">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle className="w-10 h-10 text-red-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Payment Failed
                </h2>
                <p className="text-red-700 font-medium mt-1">
                  Something went wrong with the transaction.
                </p>
              </div>
            </div>

            <div className="p-8 flex flex-col gap-3">
              <p className="text-center text-gray-500 text-sm mb-4">
                Don&apos;t worry, you haven&apos;t been charged. Please try
                again or use a different payment method.
              </p>

              <Link
                href="/"
                className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition flex items-center justify-center gap-2"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Wrapper for Suspense (Next.js Requirement for useSearchParams)
const ResponsePage = () => {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      }
    >
      <ResponseContent />
    </Suspense>
  );
};

export default ResponsePage;
