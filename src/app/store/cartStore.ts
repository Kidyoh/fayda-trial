import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Cart item types
export interface CartPackageItem {
  type: "package";
  id: string;
  packageName: string;
  price: number;
  temporaryPrice?: number;
  price2?: number; // 3-month price
  price3?: number; // 6-month price
  temporaryPrice2?: number;
  temporaryPrice3?: number;
  discountStatus: boolean;
  discountExpiryDate?: string;
  imgUrl?: string;
  tag?: string;
  courses?: any[];
  selectedDuration: 1 | 3 | 6; // months
  quantity: number;
}

export interface CartCourseItem {
  type: "course";
  id: string;
  courseName: string;
  price: number;
  temporaryPrice?: number;
  discountStatus: boolean;
  discountExpiryDate?: string;
  thumbnail?: string;
  courseDescription?: string;
  quantity: number;
}

export type CartItem = CartPackageItem | CartCourseItem;

interface CartState {
  items: CartItem[];
  isOpen: boolean;

  // Cart actions
  addPackageToCart: (
    packageData: Omit<CartPackageItem, "type" | "quantity">,
  ) => void;
  addCourseToCart: (
    courseData: Omit<CartCourseItem, "type" | "quantity">,
  ) => void;
  removeFromCart: (id: string, type: "package" | "course") => void;
  updateQuantity: (
    id: string,
    type: "package" | "course",
    quantity: number,
  ) => void;
  updatePackageDuration: (id: string, duration: 1 | 3 | 6) => void;
  clearCart: () => void;

  // Cart UI actions
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;

  // Cart calculations
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemCount: (id: string, type: "package" | "course") => number;
  isInCart: (id: string, type: "package" | "course") => boolean;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      // Add package to cart
      addPackageToCart: (packageData) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.id === packageData.id && item.type === "package",
        );

        if (existingItemIndex >= 0) {
          // If item exists, update quantity
          const updatedItems = [...items];
          const existingItem = updatedItems[
            existingItemIndex
          ] as CartPackageItem;
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartPackageItem = {
            ...packageData,
            type: "package",
            quantity: 1,
          };
          set({ items: [...items, newItem] });
        }
      },

      // Add course to cart
      addCourseToCart: (courseData) => {
        const { items } = get();
        const existingItemIndex = items.findIndex(
          (item) => item.id === courseData.id && item.type === "course",
        );

        if (existingItemIndex >= 0) {
          // If item exists, update quantity
          const updatedItems = [...items];
          const existingItem = updatedItems[
            existingItemIndex
          ] as CartCourseItem;
          updatedItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
          set({ items: updatedItems });
        } else {
          // Add new item
          const newItem: CartCourseItem = {
            ...courseData,
            type: "course",
            quantity: 1,
          };
          set({ items: [...items, newItem] });
        }
      },

      // Remove item from cart
      removeFromCart: (id, type) => {
        const { items } = get();
        const updatedItems = items.filter(
          (item) => !(item.id === id && item.type === type),
        );
        set({ items: updatedItems });
      },

      // Update item quantity
      updateQuantity: (id, type, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id, type);
          return;
        }

        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.id === id && item.type === type) {
            return { ...item, quantity };
          }
          return item;
        });
        set({ items: updatedItems });
      },

      // Update package duration
      updatePackageDuration: (id, duration) => {
        const { items } = get();
        const updatedItems = items.map((item) => {
          if (item.id === id && item.type === "package") {
            return { ...item, selectedDuration: duration } as CartPackageItem;
          }
          return item;
        });
        set({ items: updatedItems });
      },

      // Clear cart
      clearCart: () => {
        set({ items: [] });
      },

      // Toggle cart drawer
      toggleCart: () => {
        set((state) => ({ isOpen: !state.isOpen }));
      },

      // Open cart drawer
      openCart: () => {
        set({ isOpen: true });
      },

      // Close cart drawer
      closeCart: () => {
        set({ isOpen: false });
      },

      // Get total number of items
      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      // Get total price
      getTotalPrice: () => {
        const { items } = get();
        return items.reduce((total, item) => {
          let itemPrice = 0;

          if (item.type === "package") {
            const packageItem = item as CartPackageItem;
            let basePrice =
              packageItem.discountStatus && packageItem.temporaryPrice
                ? packageItem.temporaryPrice
                : packageItem.price;

            // Adjust price based on selected duration
            if (packageItem.selectedDuration === 3) {
              basePrice =
                packageItem.discountStatus && packageItem.temporaryPrice2
                  ? packageItem.temporaryPrice2
                  : packageItem.price2 || basePrice;
            } else if (packageItem.selectedDuration === 6) {
              basePrice =
                packageItem.discountStatus && packageItem.temporaryPrice3
                  ? packageItem.temporaryPrice3
                  : packageItem.price3 || basePrice;
            }

            itemPrice = basePrice;
          } else if (item.type === "course") {
            const courseItem = item as CartCourseItem;
            itemPrice =
              courseItem.discountStatus && courseItem.temporaryPrice
                ? courseItem.temporaryPrice
                : courseItem.price;
          }

          return total + itemPrice * item.quantity;
        }, 0);
      },

      // Get count of specific item
      getItemCount: (id, type) => {
        const { items } = get();
        const item = items.find((item) => item.id === id && item.type === type);
        return item ? item.quantity : 0;
      },

      // Check if item is in cart
      isInCart: (id, type) => {
        const { items } = get();
        return items.some((item) => item.id === id && item.type === type);
      },
    }),
    {
      name: "fayida-cart-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCartStore;
