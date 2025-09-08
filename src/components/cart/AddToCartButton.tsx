"use client";

import { useState } from "react";
import { ShoppingCart, Check, Plus } from "lucide-react";
import useCartStore, { CartPackageItem, CartCourseItem } from "@/app/store/cartStore";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

interface AddToCartButtonProps {
  type: 'package' | 'course';
  data: any; // Package or course data
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function AddToCartButton({ 
  type, 
  data, 
  className = "", 
  variant = 'default',
  size = 'default'
}: AddToCartButtonProps) {
  const { addPackageToCart, addCourseToCart, isInCart, openCart } = useCartStore();
  const [selectedDuration, setSelectedDuration] = useState<1 | 3 | 6>(1);
  const [showDurationSelect, setShowDurationSelect] = useState(false);

  const itemInCart = isInCart(data.id, type);

  const handleAddToCart = () => {
    if (type === 'package') {
      // For packages, show duration selection if not already selected
      if (!showDurationSelect && !itemInCart) {
        setShowDurationSelect(true);
        return;
      }

      const packageData: Omit<CartPackageItem, 'type' | 'quantity'> = {
        id: data.id,
        packageName: data.packageName,
        price: data.price,
        temporaryPrice: data.temporaryPrice,
        price2: data.price2,
        price3: data.price3,
        temporaryPrice2: data.temporaryPrice2,
        temporaryPrice3: data.temporaryPrice3,
        discountStatus: data.discountStatus || false,
        discountExpiryDate: data.discountExpiryDate,
        imgUrl: data.imgUrl,
        tag: data.tag,
        courses: data.courses,
        selectedDuration
      };

      addPackageToCart(packageData);
      
      toast({
        title: "Added to Cart",
        description: `${data.packageName} (${selectedDuration} month${selectedDuration > 1 ? 's' : ''}) added to cart`,
      });
    } else if (type === 'course') {
      const courseData: Omit<CartCourseItem, 'type' | 'quantity'> = {
        id: data.id,
        courseName: data.courseName,
        price: parseFloat(data.price),
        temporaryPrice: data.temporaryPrice ? parseFloat(data.temporaryPrice) : undefined,
        discountStatus: data.discountStatus || false,
        discountExpiryDate: data.discountExpiryDate,
        thumbnail: data.thumbnail,
        courseDescription: data.courseDescription
      };

      addCourseToCart(courseData);
      
      toast({
        title: "Added to Cart",
        description: `${data.courseName} added to cart`,
      });
    }

    setShowDurationSelect(false);
  };

  const handleViewCart = () => {
    openCart();
  };

  // For packages, show duration selection interface
  if (type === 'package' && showDurationSelect && !itemInCart) {
    return (
      <div className="space-y-3 p-4 bg-gray-50 rounded-lg border">
        <Label className="text-sm font-medium">Select Duration</Label>
        <Select
          value={selectedDuration.toString()}
          onValueChange={(value) => setSelectedDuration(parseInt(value) as 1 | 3 | 6)}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">1 Month - {data.discountStatus && data.temporaryPrice ? data.temporaryPrice : data.price} Birr</SelectItem>
            <SelectItem value="3">3 Months - {data.discountStatus && data.temporaryPrice2 ? data.temporaryPrice2 : data.price2 || data.price} Birr</SelectItem>
            <SelectItem value="6">6 Months - {data.discountStatus && data.temporaryPrice3 ? data.temporaryPrice3 : data.price3 || data.price} Birr</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex space-x-2">
          <Button
            onClick={handleAddToCart}
            className={`flex-1 bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 ${className}`}
            size={size}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowDurationSelect(false)}
            size={size}
          >
            Cancel
          </Button>
        </div>
      </div>
    );
  }

  // If item is already in cart, show "View Cart" button
  if (itemInCart) {
    return (
      <Button
        variant="outline"
        onClick={handleViewCart}
        className={`border-[#07705d] text-[#07705d] hover:bg-[#07705d]/10 ${className}`}
        size={size}
      >
        <Check className="h-4 w-4 mr-2" />
        In Cart - View
      </Button>
    );
  }

  // Default "Add to Cart" button
  return (
    <Button
      variant={variant}
      onClick={handleAddToCart}
      className={variant === 'default' ? `bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 ${className}` : className}
      size={size}
    >
      <ShoppingCart className="h-4 w-4 mr-2" />
      Add to Cart
    </Button>
  );
}

// Specialized components for different contexts
interface PackageAddToCartButtonProps {
  packageData: any;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

interface CourseAddToCartButtonProps {
  courseData: any;
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
}

export function PackageAddToCartButton({ 
  packageData, 
  className = "", 
  variant = 'default', 
  size = 'default' 
}: PackageAddToCartButtonProps) {
  return (
    <AddToCartButton 
      type="package" 
      data={packageData} 
      className={className}
      variant={variant}
      size={size}
    />
  );
}

export function CourseAddToCartButton({ 
  courseData, 
  className = "", 
  variant = 'default', 
  size = 'default' 
}: CourseAddToCartButtonProps) {
  return (
    <AddToCartButton 
      type="course" 
      data={courseData} 
      className={className}
      variant={variant}
      size={size}
    />
  );
}
