"use client";
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
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { apiUrl, homeUrl, localUrl } from "@/apiConfig";
import useFetchStore from "../../app/store/fetchStore";

import { setAccessToken, getAccessToken, clearAccessToken } from "../../lib/tokenManager";



export default function DeletePackageReview({ reviewId }: any) {
  const RecivedId = reviewId;
  const accessToken = getAccessToken();

  const fetchPackagesReview = useFetchStore(
    (state) => state.fetchPackageReview
  );
  const setFetchPackagesReview = useFetchStore(
    (state) => state.setFetchPackageReview
  );

  const { toast } = useToast();

  const handleDeleteClick = async () => {
    try {
      console.log("printed");
      const response = await fetch(`${apiUrl}/packagereview/${RecivedId}`, {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`, // Include the accessToken in the Authorization header
          },
        credentials: "include",
        // Add any necessary headers or authentication tokens
      });

      if (response.ok) {
        // File successfully deleted
        console.log("File deleted");
        setFetchPackagesReview(!fetchPackagesReview);

        toast({
          title: `Review Deleted!`,
        });
      } else {
        // File deletion failed
        console.error("Failed to delete file");
      }
    } catch (error) {
      console.error("Error deleting file", error);
    }
  };

  return (
    <div className="">
      <AlertDialog>
        <AlertDialogTrigger>
          <h1 className="bg-primaryColor rounded-full text-xs p-1 text-white">
            x
          </h1>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure to Delete your review?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDeleteClick()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
