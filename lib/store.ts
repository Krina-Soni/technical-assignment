import { create } from "zustand";

interface CartState {
  items: any[];
  setItems: (items: any[]) => void;
  addItem: (item: any) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  setItems: (items) => set({ items }),
  addItem: (newItem) => set((state) => {
    const existing = state.items.find(i => i.productId === newItem.productId);
    if (existing) {
      return {
        items: state.items.map(i => 
          i.productId === newItem.productId 
            ? { ...i, quantity: i.quantity + newItem.quantity }
            : i
        )
      };
    }
    return { items: [...state.items, newItem] };
  }),
}));