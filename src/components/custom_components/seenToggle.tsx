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
import useFetchStore from "../../app/[locale]/store/fetchStore";
import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";


//import { useToast } from "../ui/use-toast";

interface ConfirmDialogProps {
  MaterialId: string;
}
//const { toast } = useToast();

export default function MaterialSeen({
  //studentId,
  MaterialId,
}: ConfirmDialogProps) {
  const seenMaterialsFetch = useFetchStore((state) => state.seenMaterials);

  const accessToken = getAccessToken();


  const setSeenMaterialsFetch = useFetchStore(
    (state) => state.setSeenMaterials
  );

  const postData = {
    //[RecivedField.toString()]: editedValue,
    // StudentId: studentId,
    MaterialId: MaterialId,
  };

  const handleSendClick = async () => {
    try {
      console.log("printed");

      const response = await fetch(`${apiUrl}/studentmaterial/`, {
        method: "POST",
        //credentials: "include",
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
        setSeenMaterialsFetch(!seenMaterialsFetch);
        // File successfully deleted
        console.log("Chnages Made");
        //  push(`${localUrl}/${BackTo}`);
        toast({
          // title: `Successful!`,
          description: `Marked Done!`,
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
      <div onClick={() => handleSendClick()}>
        {" "}
        <h1 className="cursor-pointer hover:bg-primaryColor/50 text-white w-fit bg-primaryColor px-2 py-1 rounded">
          Mark Done
        </h1>
      </div>
    </div>
  );
}
