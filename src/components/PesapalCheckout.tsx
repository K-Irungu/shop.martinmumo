"use client";

import { useState } from "react";
import { ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useCartStore from "@/stores/cartStore";

const PesapalCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { cart, shippingInfo, hasHydrated } = useCartStore();
  // const router = useRouter();

  // Helper to check if cart is empty
  const isCartEmpty = cart.length === 0;

  // Calculate Total Amount dynamically
  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Hydration Check
  if (!hasHydrated) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  const handleProcessPayment = async () => {
    if (!shippingInfo) {
        console.error("Missing shipping info");
        return;
    }

    setIsLoading(true);

    // 1. Prepare the payload from your Store data
    // const paymentPayload = {
    //     shippingInfo: {...shippingInfo}, 
    //     amount: totalAmount,
    //     cart: cart // Pass the array directly
    // };

    // console.log("Submitting Order with:", paymentPayload);

    try {
        // CALL YOUR API HERE
        // await axios.post('/api/pesapal', paymentPayload);
        
        // Simulate delay for now
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert("PesaPal Payment Logic currently undergoing testing...");
        
    } catch (error) {
        console.error("Payment Error:", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="rounded-lg overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white">
          <h2 className="text-xl font-bold">Secure Checkout</h2>
          <p className="text-blue-100 text-sm mt-1 opacity-90">
            {shippingInfo
              ? `Completing transaction for ${shippingInfo.name}`
              : "Complete your transaction safely"}
          </p>
        </div>

        {/* Body Section */}
        <div className="p-6 space-y-6">
          <div className="flex flex-col gap-6">
            
            {/* Payment Method Card */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                Payment Method
              </label>
              <div className="flex items-center justify-between p-4 border border-blue-200 bg-blue-50/50 rounded-xl ring-1 ring-blue-100 transition-all">
                <div className="flex items-center gap-3">
                  <div className="h-4 w-4 rounded-full border-[5px] border-blue-600 bg-white shadow-sm" />
                  <span className="font-medium text-gray-800">PesaPal</span>
                </div>
                <Image
                  src="/pesapal.png"
                  alt="Pesapal"
                  width={80}
                  height={25}
                  className="object-contain opacity-90"
                />
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500 px-1">
                <ShieldCheck className="w-3 h-3 text-green-600" />
                <span>Encrypted and secured by PesaPal</span>
              </div>
            </div>

            {/* Total Summary */}
            <div className="flex justify-between items-center py-4 border-t border-dashed border-gray-200">
              <span className="text-gray-500">Total Amount</span>
              <span className="text-xl font-bold text-gray-900">
                KES {totalAmount.toLocaleString()}
              </span>
            </div>

            {/* Action Button */}
            <button
              type="button" 
              onClick={handleProcessPayment}
              // Disable if loading OR if cart is empty
              disabled={isLoading || isCartEmpty}
              className="cursor-pointer group w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-gray-200 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Pay KES {totalAmount.toLocaleString()}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-3 text-center border-t border-gray-100">
          <p className="text-[10px] text-gray-400 font-medium">
            POWERED BY PESAPAL V3
          </p>
        </div>
      </div>
    </div>
  );
};

export default PesapalCheckout;