import React from "react";
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
} from "../ui/alert-dialog";
import { apiUrl } from "@/apiConfig";
import { toast } from "../ui/use-toast";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";

//import { useToast } from "../ui/use-toast";

interface ConfirmDialogProps {
  //type: string;
  //id: string;
  //backTo: string;
  //buttonTitle: string;
  points: string;
  prizeIdRecived: string;
  prizeName: string;
}
//const { toast } = useToast();

export default function ConfirmationDialog({
  points,
  prizeIdRecived,
  prizeName,
}: ConfirmDialogProps) {
  const accessToken = getAccessToken();

  const postData = {
    //[RecivedField.toString()]: editedValue,
    prizeId: prizeIdRecived,
    prizePoint: points,
    itemName: prizeName,
  };

  const handleSendClick = async () => {
    try {
      console.log("printed");

      const response = await fetch(`${apiUrl}/studentprize/`, {
        method: "POST",
        credentials: "include",
        // Add any necessary headers or authentication tokens
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, 
          //credentials: "include",
          // withCredentials: true
          //Authorization: `Bearer ${"secret"}`,
        },

        //body: JSON.stringify(postData),
        body: JSON.stringify(postData),
      });
      //

      if (response.ok) {
        // File successfully deleted
        console.log("Chnages Made");
        //  push(`${localUrl}/${BackTo}`);
        toast({
          title: `Successful!`,
          description: `Prize Ordered!`,
        });
      } else {
        // File deletion failed
        console.error("Failed to change file");
      }
    } catch (error) {
      console.error("Error making change", error);
    }
  };

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="w-fit bg-primaryColor px-3 py-1 rounded shadow-lg shadow-black  text-white">
            <button>Get</button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>This cant be reversed!</AlertDialogTitle>
            <AlertDialogDescription>
              The required points ({points} Points) will be deducted from your
              overall score.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleSendClick()}>
              Agree
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
