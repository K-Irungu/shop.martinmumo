"use client";

import { useEffect } from "react";
import { ShippingFormInputs, shippingFormSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import useCartStore from "@/stores/cartStore";

const ShippingForm = () => {
  const { saveShippingInfo, shippingInfo, cart } = useCartStore();
  const router = useRouter();

  // Helper boolean to keep code clean
  const isCartEmpty = cart.length === 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ShippingFormInputs>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: shippingInfo || {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      line1:"",
      line2:"",
      city: "",
    },
  });


  
  useEffect(() => {
    if (shippingInfo) {
      reset(shippingInfo);
    }
  }, [shippingInfo, reset]);

  const handleShippingForm: SubmitHandler<ShippingFormInputs> = (data) => {
    saveShippingInfo(data);
    router.push("/cart?step=3", { scroll: false });
  };

  return (
    <form
      className="flex flex-col gap-4 p-8"
      onSubmit={handleSubmit(handleShippingForm)}
    >
      {/* Name Container: Flex-col on mobile, Flex-row on sm screens */}
      <div className="flex flex-col gap-4 sm:flex-row w-full">
        {/* First name */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="firstName" className="text-xs text-gray-500 font-medium">
            First Name
          </label>
          <input
            disabled={isCartEmpty}
            className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
            type="text"
            id="firstName"
            placeholder="John"
            {...register("firstName")}
          />
          {errors.firstName && (
            <p className="text-xs text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        {/* Last name */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="lastName" className="text-xs text-gray-500 font-medium">
            Last Name
          </label>
          <input
            disabled={isCartEmpty}
            className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
            type="text"
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
          />
          {errors.lastName && (
            <p className="text-xs text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* EMAIL INPUT */}
      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-xs text-gray-500 font-medium">
          Email
        </label>
        <input
          disabled={isCartEmpty}
          className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
          type="email"
          id="email"
          placeholder="johndoe@gmail.com"
          {...register("email")}
        />
        {errors.email && (
          <p className="text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* PHONE INPUT */}
      <div className="flex flex-col gap-1">
        <label htmlFor="phone" className="text-xs text-gray-500 font-medium">
          Phone
        </label>
        <input
          disabled={isCartEmpty}
          className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
          type="text"
          id="phone"
          placeholder="0712345678"
          {...register("phone")}
        />
        {errors.phone && (
          <p className="text-xs text-red-500">{errors.phone.message}</p>
        )}
      </div>


     {/* Address Container: Flex-col on mobile, Flex-row on sm screens */}
      <div className="flex flex-col gap-4 sm:flex-row w-full">
        {/* Address Line 1 */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="line1" className="text-xs text-gray-500 font-medium">
            Address Line 1
          </label>
          <input
            disabled={isCartEmpty}
            className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
            type="text"
            id="line1"
            placeholder="e.g 64, 1st Avenue, Kericho Road"
            {...register("line1")}
          />
          {errors.line1 && (
            <p className="text-xs text-red-500">{errors.line1.message}</p>
          )}
        </div>

        {/* Address Line 2 */}
        <div className="flex flex-col gap-1 flex-1">
          <label htmlFor="line2" className="text-xs text-gray-500 font-medium">
            Address Line 2
          </label>
          <input
            disabled={isCartEmpty}
            className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
            type="text"
            id="line2"
            placeholder="e.g Garden Estate"
            {...register("line2")}
          />
          {errors.line2 && (
            <p className="text-xs text-red-500">{errors.line2.message}</p>
          )}
        </div>
      </div>
      {/* CITY INPUT */}
      <div className="flex flex-col gap-1">
        <label htmlFor="city" className="text-xs text-gray-500 font-medium">
          City
        </label>
        <input
          disabled={isCartEmpty}
          className="w-full border-b border-gray-200 py-2 outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-transparent"
          type="text"
          id="city"
          placeholder="New York"
          {...register("city")}
        />
        {errors.city && (
          <p className="text-xs text-red-500">{errors.city.message}</p>
        )}
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={isCartEmpty}
        className="w-full bg-gray-800 hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 text-white p-2 rounded-lg cursor-pointer flex items-center justify-center gap-2"
      >
        Continue
        <ArrowRight className="w-3 h-3" />
      </button>
    </form>
  );
};

export default ShippingForm;