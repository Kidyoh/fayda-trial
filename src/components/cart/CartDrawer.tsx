"use client";

import { useState } from "react";
import { X, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react";
import useCartStore, { CartItem, CartPackageItem, CartCourseItem } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    updatePackageDuration,
    getTotalPrice,
    getTotalItems,
    clearCart
  } = useCartStore();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();

  if (!isOpen) return null;

  const handleQuantityChange = (item: CartItem, change: number) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, item.type, newQuantity);
    }
  };

  const handleDurationChange = (packageId: string, duration: string) => {
    updatePackageDuration(packageId, parseInt(duration) as 1 | 3 | 6);
  };

  const getPackagePrice = (packageItem: CartPackageItem) => {
    let price = packageItem.discountStatus && packageItem.temporaryPrice 
      ? packageItem.temporaryPrice 
      : packageItem.price;
    
    if (packageItem.selectedDuration === 3) {
      price = packageItem.discountStatus && packageItem.temporaryPrice2 
        ? packageItem.temporaryPrice2 
        : packageItem.price2 || price;
    } else if (packageItem.selectedDuration === 6) {
      price = packageItem.discountStatus && packageItem.temporaryPrice3 
        ? packageItem.temporaryPrice3 
        : packageItem.price3 || price;
    }
    
    return price;
  };

  const getCoursePrice = (courseItem: CartCourseItem) => {
    return courseItem.discountStatus && courseItem.temporaryPrice 
      ? courseItem.temporaryPrice 
      : courseItem.price;
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={closeCart}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-[#07705d] to-[#bf8c13] text-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6" />
              <h2 className="text-xl font-bold">Shopping Cart</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={closeCart}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Add some packages or courses to get started!</p>
                <Button onClick={closeCart} className="bg-[#07705d] hover:bg-[#07705d]/90">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={`${item.type}-${item.id}`} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        {item.type === 'package' ? (
                          <div className="w-16 h-16 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-white" />
                          </div>
                        ) : (
                          <div className="w-16 h-16 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-lg flex items-center justify-center">
                            <ShoppingBag className="h-8 w-8 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 truncate">
                          {item.type === 'package' ? (item as CartPackageItem).packageName : (item as CartCourseItem).courseName}
                        </h4>
                        
                        <Badge variant="secondary" className="mt-1">
                          {item.type === 'package' ? 'Package' : 'Course'}
                        </Badge>

                        {/* Package Duration Selection */}
                        {item.type === 'package' && (
                          <div className="mt-2">
                            <Select
                              value={(item as CartPackageItem).selectedDuration.toString()}
                              onValueChange={(value) => handleDurationChange(item.id, value)}
                            >
                              <SelectTrigger className="w-full h-8 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1">1 Month</SelectItem>
                                <SelectItem value="3">3 Months</SelectItem>
                                <SelectItem value="6">6 Months</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="text-sm font-bold text-[#07705d]">
                            {item.type === 'package' 
                              ? `${getPackagePrice(item as CartPackageItem)} Birr`
                              : `${getCoursePrice(item as CartCourseItem)} Birr`
                            }
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item, -1)}
                              className="h-8 w-8 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuantityChange(item, 1)}
                              className="h-8 w-8 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id, item.type)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t bg-white p-4">
              <div className="space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Total ({totalItems} items)</span>
                  <span className="text-2xl font-bold text-[#07705d]">{totalPrice} Birr</span>
                </div>

                <Separator />

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link href="/cart" className="w-full">
                    <Button 
                      className="w-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90"
                      onClick={closeCart}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Checkout
                    </Button>
                  </Link>
                  
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}






