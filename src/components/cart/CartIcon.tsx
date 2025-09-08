"use client";

import { ShoppingCart } from "lucide-react";
import useCartStore from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";

interface CartIconProps {
  className?: string;
}

export function CartIcon({ className = "" }: CartIconProps) {
  const { getTotalItems, toggleCart } = useCartStore();
  const itemCount = getTotalItems();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleCart}
      className={`relative p-2 hover:bg-[#c7cc3f]/10 ${className}`}
    >
      <ShoppingCart className="h-5 w-5 text-[#07705d]" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-[#bf8c13] to-[#c7cc3f] text-white text-xs font-bold rounded-full flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </span>
      )}
    </Button>
  );
}
