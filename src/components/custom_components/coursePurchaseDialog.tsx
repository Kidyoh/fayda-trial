import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { getAccessToken } from "../../lib/tokenManager";
import { apiUrl } from "@/apiConfig";
import { useRouter } from "next/navigation";
import { ShoppingCart, CreditCard, Phone } from "lucide-react";
import {
  createCoursePurchase,
  initiateCoursePayment,
  formatEthiopianPhoneNumber,
} from "../../lib/courseAPI";

interface CoursePurchaseDialogProps {
  courseId: string;
  courseName: string;
  price: string;
  temporaryPrice?: string;
  discountStatus?: boolean;
  discountExpiryDate?: string;
  onPurchaseSuccess?: () => void;
}

export function CoursePurchaseDialog({
  courseId,
  courseName,
  price,
  temporaryPrice,
  discountStatus = false,
  discountExpiryDate,
  onPurchaseSuccess,
}: CoursePurchaseDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);

  const accessToken = getAccessToken();
  const { push } = useRouter();

  // Calculate the final price
  const finalPrice = discountStatus && temporaryPrice ? temporaryPrice : price;

  const handlePurchase = async () => {
    if (!phoneNumber) {
      setMessage("Please enter a valid phone number.");
      return;
    }

    if (!phoneNumber.startsWith("+251")) {
      setMessage("Please enter phone number in +251... format");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      // Format phone number properly
      const formattedPhoneNumber = formatEthiopianPhoneNumber(phoneNumber);

      // Create course purchase record using the new API
      const purchase = await createCoursePurchase(
        {
          courseId,
          price: finalPrice,
          phoneNumber: formattedPhoneNumber,
          paymentMethod: "santipay",
        },
        accessToken,
      );

      // Initiate payment with SantiPay using the new API
      const paymentResult = await initiateCoursePayment(
        {
          courseId,
          price: finalPrice,
          phoneNumber: formattedPhoneNumber,
          purchaseId: purchase.id,
        },
        accessToken,
      );

      console.log("Payment Response:", paymentResult);

      if (paymentResult.paymentUrl) {
        setMessage("Payment initiated successfully. Redirecting...");
        window.location.href = paymentResult.paymentUrl;
      } else {
        setMessage(
          "Payment initiated successfully. Please check your phone for payment instructions.",
        );
      }

      // Call success callback if provided
      if (onPurchaseSuccess) {
        onPurchaseSuccess();
      }
    } catch (error) {
      console.error("Error during course purchase:", error);
      setMessage(
        "An error occurred while processing your purchase. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button className="w-full bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg">
          <ShoppingCart className="h-5 w-5" />
          Enroll Now - {finalPrice} Birr
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold text-[#07705d] flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            Purchase Course
          </AlertDialogTitle>
        </AlertDialogHeader>

        <div className="space-y-4">
          {/* Course Info */}
          <div className="bg-gradient-to-r from-[#c7cc3f]/10 to-[#bf8c13]/10 rounded-lg p-4 border border-[#c7cc3f]/30">
            <h3 className="font-semibold text-[#07705d] mb-2">{courseName}</h3>
            <div className="flex items-center justify-between">
              {discountStatus ? (
                <div className="flex items-center gap-2">
                  <span className="text-gray-500 line-through text-sm">
                    {price} Birr
                  </span>
                  <span className="text-xl font-bold text-[#07705d]">
                    {temporaryPrice} Birr
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-[#07705d]">
                  {price} Birr
                </span>
              )}
              {discountStatus && discountExpiryDate && (
                <span className="text-xs text-red-500 font-medium">
                  Until {new Date(discountExpiryDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>

          {/* Phone Number Input */}
          <div className="space-y-2">
            <label className="flex text-sm font-medium text-gray-700 items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#07705d] focus:border-transparent"
              placeholder="+251912345678"
            />
            <p className="text-xs text-gray-500">
              Please enter your phone number in +251... format for payment
            </p>
          </div>

          {/* Error Message */}
          {message && (
            <div
              className={`p-3 rounded-lg text-sm ${
                message.includes("successfully")
                  ? "bg-green-100 text-green-700 border border-green-200"
                  : "bg-red-100 text-red-700 border border-red-200"
              }`}
            >
              {message}
            </div>
          )}
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={handlePurchase}
              disabled={isLoading || !phoneNumber}
              className="bg-gradient-to-r from-[#07705d] to-[#bf8c13] hover:from-[#07705d]/90 hover:to-[#bf8c13]/90 text-white px-6 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? "Processing..." : `Pay ${finalPrice} Birr`}
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
