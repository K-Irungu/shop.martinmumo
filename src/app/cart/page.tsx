"use client";

import PesapalCheckout from "@/components/PesapalCheckout";
import ShippingForm from "@/components/ShippingForm";
import useCartStore from "@/stores/cartStore";
import { ArrowRight, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react"; // 1. Import Suspense

const steps = [
  { id: 1, title: "Shopping Cart" },
  { id: 2, title: "Shipping Address" },
  { id: 3, title: "Pesapal Checkout" },
];

// 2. Rename your main logic component to "CartContent"
// This component uses useSearchParams, so it causes the build error if not wrapped.
const CartContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activeStep = parseInt(searchParams.get("step") || "1");

  const { cart, removeFromCart, shippingInfo } = useCartStore();

  return (
    <div className="flex flex-col gap-8 items-center justify-center mt-12">
      {/* TITLE */}
      <h1 className="text-2xl font-medium">Your Shopping Cart</h1>

      {/* STEPS UI */}
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {steps.map((step) => (
          <div
            className={`flex items-center gap-2 border-b-2 pb-4 ${
              step.id === activeStep ? "border-gray-800" : "border-gray-200"
            }`}
            key={step.id}
          >
            <div
              className={`w-6 h-6 rounded-full text-white p-4 flex items-center justify-center ${
                step.id === activeStep ? "bg-gray-800" : "bg-gray-400"
              }`}
            >
              {step.id}
            </div>
            <p
              className={`text-sm font-medium ${
                step.id === activeStep ? "text-gray-800" : "text-gray-400"
              }`}
            >
              {step.title}
            </p>
          </div>
        ))}
      </div>

      {/* STEPS & DETAILS */}
      <div className="w-full flex flex-col lg:flex-row gap-16">
        {/* MAIN CONTENT AREA */}
        <div className="w-full lg:w-7/12 shadow-lg border-1 border-gray-100 rounded-lg flex flex-col gap-8 min-h-[400px]">
          {activeStep === 1 ? (
            // --- STEP 1 LOGIC ---
            cart.length > 0 ? (
              // CASE A: HAS ITEMS
              cart.map((item) => (
                <div
                  className="flex items-center justify-between p-8"
                  key={item.id + item.selectedSize + item.selectedColor}
                >
                  <div className="flex gap-8">
                    <div className="relative w-32 h-32 bg-gray-50 rounded-lg overflow-hidden">
                      <Image
                        src={item.images[item.selectedColor]}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium">
                        KES{" "}
                        {item.price.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFromCart(item)}
                    className="w-8 h-8 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 text-red-400 flex items-center justify-center cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))
            ) : (
              // CASE B: EMPTY CART
              <div className="h-full flex flex-col items-center justify-center py-20 gap-4 opacity-50">
                <ShoppingBag className="w-16 h-16 text-gray-300" />
                <p className="text-lg font-medium text-gray-500">
                  No items in cart
                </p>
              </div>
            )
          ) : activeStep === 2 ? (
            // --- STEP 2 LOGIC ---
            <ShippingForm />
          ) : activeStep === 3 && shippingInfo ? (
            // --- STEP 3 LOGIC ---
            <PesapalCheckout />
          ) : (
            // --- FALLBACK LOGIC ---
            <div className="p-8 flex flex-col gap-4 items-center justify-center text-center h-full">
              <p className="text-sm text-gray-500">Missing shipping details.</p>
              <button
                onClick={() => router.push("/cart?step=2")}
                className="text-blue-600 hover:underline text-sm"
              >
                Go back to Shipping
              </button>
            </div>
          )}
        </div>

        {/* CART SUMMARY SIDEBAR */}
        <div className="w-full lg:w-5/12 shadow-lg border-1 border-gray-100 p-8 rounded-lg flex flex-col gap-8 h-max">
          <h2 className="font-semibold">Cart Details</h2>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Subtotal</p>
              <p className="font-medium">
                KES{" "}
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between text-sm">
              <p className="text-gray-500">Discount (0%)</p>
              <p className="font-medium">KES 0</p>
            </div>
            <hr className="border-gray-200" />
            <div className="flex justify-between">
              <p className="text-gray-800 font-semibold">Total</p>
              <p className="font-medium">
                KES{" "}
                {cart
                  .reduce((acc, item) => acc + item.price * item.quantity, 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
          {activeStep === 1 && (
            <button
              disabled={cart.length === 0} // Disable if empty
              onClick={() => router.push("/cart?step=2", { scroll: false })}
              className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
            >
              Continue
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// 3. Create the wrapper component
const CartPage = () => {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[600px] flex items-center justify-center">
          <Loader2 className="w-10 h-10 animate-spin text-gray-400" />
        </div>
      }
    >
      <CartContent />
    </Suspense>
  );
};

export default CartPage;