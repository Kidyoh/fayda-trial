'use client';

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
import { Download } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export default function DownloadAppConfirmation() {
  const { t } = useLanguage();
  const [token, setToken] = React.useState('');
  
  React.useEffect(() => {
    setToken(getAccessToken() || '');
  }, []);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="relative w-full px-8 py-4 bg-primaryColor/80 backdrop-blur-sm hover:bg-primaryColor text-white rounded-xl flex items-center justify-center gap-2 font-medium border border-white/10 transition duration-200">
          <Download className="w-5 h-5" />
          <span>Download App</span>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-gray-900/95 backdrop-blur-lg border border-white/10">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">Download Fayida Academy App</AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            Do you want to proceed to download the mobile application?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border border-white/10">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction className="bg-primaryColor hover:bg-primaryColor/90 text-white">
            <a href={`${apiUrl}/download`} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
