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

export function ProceedPayment(props: any) {
  const { packageId, price } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number

  const accessToken = getAccessToken();
  const { push } = useRouter();

  const handlePayment = async () => {
    if (!phoneNumber) {
      setMessage("Please enter a valid phone number.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${apiUrl}/paymenthandler/checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include token if needed
        },
        body: JSON.stringify({
          packageId,
          price,
          phoneNumber, // Add phone number to the request body
        }),
      });

      console.log("Raw Response:", response); // Log the raw response

      const data = await response.json();
      console.log("Parsed Response Data:", data); // Log the parsed JSON data

      if (response.ok) {
        setMessage("Payment initiated successfully.");
        console.log("Res: " + JSON.stringify(data.paymentUrl));
        window.location.href = data.paymentUrl; // Redirect to payment URL
      } else {
        setMessage(data.error || "An error occurred.");
      }
    } catch (error) {
      console.error("Error during payment initiation:", error);
      setMessage("An error occurred while processing the request.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-full bg-primaryColor px-3 py-3 rounded text-white text-lg text-center ">
          <button>Enroll</button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to proceed to purchase?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <div className="px-4 py-2">
          <label className="block text-sm mb-2">
            Phone Number (write in +251... format)
          </label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Enter your phone number"
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="bg-primaryColor px-4 py-2 rounded text-white"
            >
              {isLoading ? "Processing..." : "Proceed"}
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
        {message && <p className="text-sm text-center mt-2">{message}</p>}
      </AlertDialogContent>
    </AlertDialog>
  );
}
