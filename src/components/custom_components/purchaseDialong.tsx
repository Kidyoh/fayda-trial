"use client";
import { apiUrl } from "@/apiConfig";
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
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

export function PurchaseDialogCustom(props: any) {
  const PackageId = props.packageId;
  const Price = props.price;
  const Price2 = props.price2;
  const Price3 = props.price3;

  const [data, setData] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedPayemtOption, setSelectedPaymentOption] = useState("");
  const [selectedTimeLength, setSelectedTimeLength] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [pageSection, setPageSection] = useState("timelength");
  const [selectedPrice, setSelectedPrice] = useState(Price);

  const [formData, setFormData] = useState({
    name: "",
    transaction_id: "",
  });

  const enableButton = () => {
    setIsButtonDisabled(false);
  };

  const handleTimeLength = (timeSelected: any) => {
    setSelectedTimeLength(timeSelected);
    if (timeSelected == "1") {
      setSelectedPrice(Price);
    } else if (timeSelected == "3") {
      setSelectedPrice(Price2);
    } else if (timeSelected == "6") {
      setSelectedPrice(Price3);
    }

    setPageSection("paymentOptions");
  };

  const handleSelectPaymentOption = (
    paymentOptionRecived: any,
    accountNumberRecived: any
  ) => {
    setSelectedPaymentOption(paymentOptionRecived);
    setAccountNumber(accountNumberRecived);
    setPageSection("orderPage");
    enableButton();
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`${apiUrl}/paymentmethods`);
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData[0].accountNumber);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const additionalData = {
    packagesId: PackageId,
    method: selectedPayemtOption,
    value: selectedPrice,
    timeLength: selectedTimeLength,
  };

  const updatedFormData = { ...formData, ...additionalData };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Perform the POST request here
    fetch(`${apiUrl}/purchaselist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data:", data);
        console.log("FData:", data.message);

        if (data.message == "success") {
          toast({
            title: `Success!`,
            description: `You have Orderd Your course!`,
          });
        }

        if (data.message == "already_purchased") {
          console.log("already purchased run");
          toast({
            title: `You have requested an update!`,
            description: ``,
          });
        }
        if (data.message == "inactive") {
          toast({
            title: `Your account is Inactive!`,
            description: `Go to your profile, and activate your email.`,
          });
        }

        if (data.message == "failed") {
          console.log("Not logged in!");
          toast({
            title: `You need to log in!`,
            description: `Log in First.`,
          });
          window.location.href = "/login";
        }
        // Reset the form
        setFormData({
          name: "",
          transaction_id: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="w-fit bg-primaryColor text-xs px-2 py-1 rounded shadow-lg shadow-black  text-white">
          <button>Enroll</button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        {pageSection == "timelength" && (
          <AlertDialogHeader>
            <AlertDialogTitle>Choose Your time Length.</AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <div className="space-y-2">
                  <ul
                    className="cursor-pointer hover:text-primaryColor hover:underline"
                    onClick={() => handleTimeLength("1")}
                  >
                    Monthly - {Price}
                  </ul>
                  <ul
                    className="cursor-pointer hover:text-primaryColor hover:underline"
                    onClick={() => handleTimeLength("3")}
                  >
                    Three Months - {Price2}
                  </ul>
                  <ul
                    className="cursor-pointer hover:text-primaryColor hover:underline"
                    onClick={() => handleTimeLength("6")}
                  >
                    Six Months - {Price3}
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setPageSection("timelength");
                }}
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogHeader>
        )}

        {pageSection == "paymentOptions" && (
          <AlertDialogHeader>
            <AlertDialogTitle>Choose Your Payment Option.</AlertDialogTitle>
            <AlertDialogDescription>
              <div>
                <div>
                  {data ? (
                    <ul>
                      {data.map((item, index: number) => (
                        <div key={index} className="py-1">
                          <h1
                            className="cursor-pointer hover:text-green-500"
                            onClick={() =>
                              handleSelectPaymentOption(
                                item.name,
                                item.accountNumber
                              )
                            }
                            key={item.id}
                          >
                            {item.name}
                          </h1>
                        </div>
                      ))}
                    </ul>
                  ) : (
                    <p>Loading data...</p>
                  )}
                </div>

                <h1>{selectedPayemtOption}</h1>
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setPageSection("timelength");
                }}
              >
                Cancel
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogHeader>
        )}

        {pageSection == "orderPage" && (
          <AlertDialogHeader>
            <AlertDialogTitle>
              <span className="text-primaryColor">Payment Form</span>
            </AlertDialogTitle>
            <h1>
              Note: Transfer Birr{" "}
              <span className="text-primaryColor">
                {" "}
                {selectedTimeLength == "1" && Price}
                {selectedTimeLength == "3" && Price2}
                {selectedTimeLength == "6" && Price3}
              </span>{" "}
              to a{" "}
              <span className="text-primaryColor">{selectedPayemtOption}</span>{" "}
              account number:{" "}
              <span className="text-primaryColor">{accountNumber}</span>
            </h1>
            <AlertDialogDescription>
              <div>
                <form onSubmit={handleSubmit}>
                  <label>
                    Name:
                    <input
                      className="border-b-2 border-primaryColor"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </label>
                  <br /> <br />
                  <label className="">
                    Transaction Id:
                    <input
                      className="border-b-2 border-primaryColor"
                      type="text"
                      name="transaction_id"
                      value={formData.transaction_id}
                      onChange={handleChange}
                    />
                  </label>
                  <br />
                  <br />
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => {
                        setPageSection("timelength");
                      }}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={enableButton}
                      disabled={isButtonDisabled}
                      className="bg-primaryColor"
                      type="submit"
                    >
                      Submit
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </form>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
}
