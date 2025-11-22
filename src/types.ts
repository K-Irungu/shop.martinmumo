import { z } from "zod";

// --- TYPES ---

export type ProductType = {
  id: string | number;
  name: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  images: Record<string, string>;
};

export type ProductsType = ProductType[];

export type CartItemType = ProductType & {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
};

export type CartItemsType = CartItemType[];

// --- SCHEMAS ---

// 1. Shipping Schema
export const shippingFormSchema = z.object({
  firstName: z.string().min(1, "firstName is required!"),
  lastName: z.string().min(1, "lastName is required!"),
  // Fixed: z.email() is not valid standalone, must be z.string().email()
  email: z.string().email("Invalid email address!"), 
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits!")
    .max(13, "Phone number is too long!") // Adjusted for typical localized formats (e.g., 254...)
    .regex(/^\d+$/, "Phone number must contain only numbers!"),
  line1: z.string().min(1, "Address Line 1 is required!"),
  line2: z.string().min(1, "Address Line 2 is required!"),
  city: z.string().min(1, "City is required!"),
});

export type ShippingFormInputs = z.infer<typeof shippingFormSchema>;

// 2. Cart Item Schema (For validation inside Checkout)
// This ensures the items passed to checkout match the structure of CartItemType
const cartItemZodSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  price: z.number(),
  quantity: z.number().min(1),
  selectedSize: z.string().optional(),
  selectedColor: z.string().optional(),
});

// 3. Pesapal Checkout Schema (UPDATED)
// Validates the data required to initiate the request, not the card itself.
export const pesapalCheckoutSchema = z.object({
  totalAmount: z.number().min(1, "Total amount must be greater than 0"),
  // Re-use the shipping schema here to ensure we have valid user details
  shippingInfo: shippingFormSchema, 
  items: z.array(cartItemZodSchema).min(1, "Cart cannot be empty!"),
  description: z.string().optional(),
});

export type PesapalCheckoutInputs = z.infer<typeof pesapalCheckoutSchema>;

// --- STORE TYPES ---

export type CartStoreStateType = {
  cart: CartItemsType;
  hasHydrated: boolean;
  shippingInfo: ShippingFormInputs | null;
};

export type CartStoreActionsType = {
  addToCart: (product: CartItemType) => void;
  removeFromCart: (product: CartItemType) => void;
  clearCart: () => void;
  saveShippingInfo: (info: ShippingFormInputs) => void;
};