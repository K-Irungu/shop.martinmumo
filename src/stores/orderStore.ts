import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// --- Types (You can move these to @/types if you prefer) ---
interface OrderStoreState {
  orderTrackingId: string | null;
  orderMerchantReference: string | null;
  hasHydrated: boolean;
}

interface OrderStoreActions {
  setOrderDetails: (trackingId: string, reference: string) => void;
  clearOrderDetails: () => void;
}

// --- The Store ---
const useOrderStore = create<OrderStoreState & OrderStoreActions>()(
  persist(
    (set) => ({
      // Initial State
      orderTrackingId: null,
      orderMerchantReference: null,
      hasHydrated: false,

      // Action: Save the IDs returned by Pesapal
      setOrderDetails: (trackingId, reference) =>
        set({
          orderTrackingId: trackingId,
          orderMerchantReference: reference,
        }),

      // Action: Clear data (e.g., after successful payment page load)
      clearOrderDetails: () =>
        set({
          orderTrackingId: null,
          orderMerchantReference: null,
        }),
    }),
    {
      name: "order-storage", // Unique key for LocalStorage
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.hasHydrated = true;
        }
      },
    }
  )
);

export default useOrderStore;