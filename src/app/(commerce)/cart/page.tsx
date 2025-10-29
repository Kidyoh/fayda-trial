"use client";

import { useState } from "react";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  CreditCard,
  ArrowLeft,
  Phone,
} from "lucide-react";
import useCartStore, {
  CartItem,
  CartPackageItem,
  CartCourseItem,
} from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import {
  processCartCheckout,
  validateCartItems,
  formatEthiopianPhoneNumber,
} from "@/lib/cartAPI";
import { getAccessToken } from "@/lib/tokenManager";
import { toast } from "@/components/ui/use-toast";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    updatePackageDuration,
    getTotalPrice,
    getTotalItems,
    clearCart,
  } = useCartStore();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showProviderModal, setShowProviderModal] = useState(false);

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const accessToken = getAccessToken();

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
    let price =
      packageItem.discountStatus && packageItem.temporaryPrice
        ? packageItem.temporaryPrice
        : packageItem.price;

    if (packageItem.selectedDuration === 3) {
      price =
        packageItem.discountStatus && packageItem.temporaryPrice2
          ? packageItem.temporaryPrice2
          : packageItem.price2 || price;
    } else if (packageItem.selectedDuration === 6) {
      price =
        packageItem.discountStatus && packageItem.temporaryPrice3
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

  const handleCheckout = async (provider: "santimpay" | "chapa") => {
    if (!accessToken) {
      toast({
        title: "Authentication Required",
        description: "Please log in to complete your purchase.",
        variant: "destructive",
      });
      return;
    }

    if (!phoneNumber) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number for payment.",
        variant: "destructive",
      });
      return;
    }

    // Validate cart items
    const validation = validateCartItems(items);
    if (!validation.valid) {
      toast({
        title: "Cart Validation Error",
        description: validation.errors.join(", "),
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const formattedPhoneNumber = formatEthiopianPhoneNumber(phoneNumber);

      toast({
        title: "Processing Purchase",
        description: "Please wait while we process your order...",
      });

      const result = await processCartCheckout(
        items,
        formattedPhoneNumber,
        accessToken,
        provider,
      );

      if (result.success) {
        toast({
          title: "Purchase Initiated Successfully",
          description: result.message || "Redirecting to payment...",
        });

        if (result.paymentUrl) {
          // Clear cart before redirecting
          clearCart();
          setTimeout(() => {
            window.location.href = result.paymentUrl!;
          }, 1000);
        } else {
          toast({
            title: "Payment Initiated",
            description: "Please check your phone for payment instructions.",
          });
          // Clear cart after successful initiation
          clearCart();
        }
      } else {
        toast({
          title: "Purchase Failed",
          description: result.message || "An error occurred during checkout.",
          variant: "destructive",
        });
      }
    } catch (error: unknown) {
      console.error("Checkout error:", error);

      // More detailed error message
      let errorMessage = "An error occurred while processing your purchase.";
      if (error instanceof Error && error.message) {
        if (error.message.includes("Not Found")) {
          errorMessage =
            "Payment service is temporarily unavailable. Please try again later or contact support.";
        } else if (error.message.includes("Failed to process purchases")) {
          errorMessage = error.message;
        } else {
          errorMessage = error.message;
        }
      }

      toast({
        title: "Checkout Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/5 via-white to-[#bf8c13]/5 pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center py-12">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-[#07705d] mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Discover our amazing packages and courses to start your learning
              journey!
            </p>
            <Link href="/">
              <Button className="bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c7cc3f]/5 via-white to-[#bf8c13]/5 pt-24 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#07705d] mb-2">
                Shopping Cart
              </h1>
              <p className="text-gray-600">{totalItems} items in your cart</p>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="border-[#07705d] text-[#07705d] hover:bg-[#07705d]/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card
                  key={`${item.type}-${item.id}`}
                  className="border border-[#c7cc3f]/30"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      {/* Item Image */}
                      <div className="flex-shrink-0">
                        {item.type === "package" ? (
                          <div className="w-20 h-20 bg-gradient-to-br from-[#07705d] to-[#bf8c13] rounded-xl flex items-center justify-center">
                            <ShoppingBag className="h-10 w-10 text-white" />
                          </div>
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f] rounded-xl flex items-center justify-center">
                            <ShoppingBag className="h-10 w-10 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                              {item.type === "package"
                                ? (item as CartPackageItem).packageName
                                : (item as CartCourseItem).courseName}
                            </h3>

                            <Badge variant="secondary" className="mb-3">
                              {item.type === "package" ? "Package" : "Course"}
                            </Badge>

                            {/* Package Duration Selection */}
                            {item.type === "package" && (
                              <div className="mb-4">
                                <Label className="text-sm font-medium mb-2 block">
                                  Duration
                                </Label>
                                <Select
                                  value={(
                                    item as CartPackageItem
                                  ).selectedDuration.toString()}
                                  onValueChange={(value) =>
                                    handleDurationChange(item.id, value)
                                  }
                                >
                                  <SelectTrigger className="w-40">
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

                            {/* Quantity Controls */}
                            <div className="flex items-center space-x-3">
                              <Label className="text-sm font-medium">
                                Quantity:
                              </Label>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item, -1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium w-12 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleQuantityChange(item, 1)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>

                          {/* Price and Actions */}
                          <div className="text-right">
                            <div className="text-2xl font-bold text-[#07705d] mb-2">
                              {item.type === "package"
                                ? `${getPackagePrice(item as CartPackageItem) * item.quantity} Birr`
                                : `${getCoursePrice(item as CartCourseItem) * item.quantity} Birr`}
                            </div>
                            <div className="text-sm text-gray-500 mb-4">
                              {item.type === "package"
                                ? `${getPackagePrice(item as CartPackageItem)} Birr each`
                                : `${getCoursePrice(item as CartCourseItem)} Birr each`}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFromCart(item.id, item.type)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Clear Cart Button */}
              <div className="pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Clear Cart</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to remove all items from your
                        cart? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={clearCart}
                        className="bg-red-500 hover:bg-red-600"
                      >
                        Clear Cart
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border border-[#c7cc3f]/30 sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl text-[#07705d]">
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({totalItems} items)</span>
                    <span className="font-semibold">{totalPrice} Birr</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-[#07705d]">{totalPrice} Birr</span>
                  </div>

                  <Separator />

                  {/* Phone Number Input */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number for Payment</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="09xxxxxxxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  {/* Checkout Button */}
                  {!accessToken ? (
                    <Link href="/login" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Login to Checkout
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      className="w-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90"
                      onClick={() => setShowProviderModal(true)}
                      disabled={isLoading || !phoneNumber}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      {isLoading ? "Processing..." : "Proceed to Payment"}
                    </Button>
                  )}

                  <p className="text-xs text-gray-500 text-center mt-4">
                    By proceeding, you agree to our terms of service and privacy
                    policy.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Provider Modal */}
      <Dialog open={showProviderModal} onOpenChange={setShowProviderModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-[#07705d]">
              Choose Payment Method
            </DialogTitle>
            <DialogDescription className="text-center">
              Select your preferred payment provider to complete your purchase.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4 py-4">
            <Button
              onClick={() => {
                setShowProviderModal(false);
                handleCheckout("santimpay");
              }}
              className="w-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 h-16 text-lg"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                  <span className="text-[#07705d] font-bold text-sm">S</span>
                </div>
                <span>SantiPay</span>
              </div>
            </Button>
            <Button
              onClick={() => {
                setShowProviderModal(false);
                handleCheckout("chapa");
              }}
              variant="outline"
              className="w-full border-[#07705d] text-[#07705d] hover:bg-[#07705d]/10 h-16 text-lg"
              disabled={isLoading}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#07705d] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">C</span>
                </div>
                <span>Chapa</span>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
