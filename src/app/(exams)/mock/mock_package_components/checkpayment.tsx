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

export default function CheckPayment({ mock_package_id }: any) {
  const [typedPhoneNumber, setTypedPhoneNumber] = useState("");
  const [open, setOpen] = useState(false);
  const { push } = useRouter();
  // const PushTo = pushto;
  const MockPakcageId = mock_package_id;

  const phoneNumber = useTemporaryPhonenumberStore(
    (state) => state.phoneNumber,
  );
  const setPhoneNumber = useTemporaryPhonenumberStore(
    (state) => state.setPhoneNumber,
  );
  //setTypedPhoneNumber(setPhoneNumber.toString());

  const handleInputChange = (event: any) => {
    setTypedPhoneNumber(event.target.value);

    // setSelectedChoice(event.target.value);
  };

  const updatedData = {
    ["test"]: typedPhoneNumber,
  };
  //  `${apiUrl}/mockexampackagepurchase/checkpurchase/${typedPhoneNumber}/3`,
  // Handle errors

  const handleUpdate = async () => {
    try {
      fetch(
        `${apiUrl}/mockexampackagepurchase/checkpurchase/${typedPhoneNumber}/${MockPakcageId}`,
      ) // Replace 'url' with your actual URL
        .then((response) => response.json()) // Wait for the response and parse JSON
        .then((data) => {
          console.log("responseeee: ", data);
          setPhoneNumber(typedPhoneNumber);
          if (data.message == "success") {
            push(`/mock/paid_mock_package/${MockPakcageId}`);
          } else if (data.message == "pending") {
            toast({
              title: `Payment Pending!`,
              description: `We will check and approve your request!`,
            });
          } else if (data.message == "new number") {
            console.log("it is new number");
            setOpen(false);
            push("/register_examtaker");
          } else if (data.message == "not purchased") {
            console.log("Not purchased anypackage");
            setOpen(false);
            push("/mock/purchaseinfo");
          } else {
            console.log("It is false");
            //   setOpen(false);

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
            We just want to check if you are new here!
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
