"use client";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import router from "next/router";
import { apiUrl } from "@/apiConfig";
import { toast } from "@/components/ui/use-toast";
import { ScrollText } from "lucide-react";
import useTemporaryPhonenumberStore from "@/app/store/temporaryphonenumberStore";

import { useRouter } from "next/navigation";

export default function CheckPhoneNumber({ mockPackageId }: any) {
  const [typedPhoneNumber, setTypedPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  // const PushTo = pushto;
  const MockPackageId = mockPackageId;
  const phoneNumber = useTemporaryPhonenumberStore(
    (state) => state.phoneNumber
  );
  const setPhoneNumber = useTemporaryPhonenumberStore(
    (state) => state.setPhoneNumber
  );

  const handleInputChange = (event: any) => {
    setTypedPhoneNumber(event.target.value);
    // setSelectedChoice(event.target.value);
  };

  const updatedData = {
    ["test"]: typedPhoneNumber,
  };

  // Handle errors

  const handleUpdate = async () => {
    try {
      fetch(
        `${apiUrl}/mockexampackagepurchase/checkphonenumberfree/${typedPhoneNumber}`
      ) // Replace 'url' with your actual URL
        .then((response) => response.json()) // Wait for the response and parse JSON
        .then((data) => {
          console.log("responseeee: ", data);
          setPhoneNumber(typedPhoneNumber);

          if (data) {
            console.log("it is true");
            setOpen(false);
            // push(`/mock_package/${MockPackageId}`);
            //  push(`/mock_package/free_mock_package/${MockPackageId}`);
            // push(`/mock_package/free_mock_package/${MockPackageId}`);
            push("/mock_package/selectmainfolder");
          } else {
            console.log("It is false");
            setOpen(false);

            push("/register_examtaker");
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    } catch (error) {
      console.error("Error Updating file", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="hover:underline cursor-pointer">
        Take Exam
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Type Your Phone Number </DialogTitle>
          <DialogDescription>
            We just need to check if you are new here!
          </DialogDescription>

          <Input
            onChange={handleInputChange}
            type="number"
            // defaultValue={phoneNumber}
          />
        </DialogHeader>
        <DialogFooter>
          {
            <Button
              type="submit"
              className="bg-primaryColor text-white"
              onClick={() => handleUpdate()}
            >
              Proceed
            </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
