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



export default function DownloadAppConfirmation({
 
}) {
  const accessToken = getAccessToken();

 

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <div className="w-fit hover:bg-gray-300 hover:text-primaryColor duration-150 bg-primaryColor px-3 py-1 rounded shadow-lg shadow-black  text-white">
            <button>Download App</button>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Download Fayida Academy App</AlertDialogTitle>
            <AlertDialogDescription>
             Do you want to procced to download the mobile application? 
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction >
              <a href={`${apiUrl}/download`}> Download</a>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
