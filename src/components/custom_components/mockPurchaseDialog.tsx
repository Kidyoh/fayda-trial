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
import useSelectedMockPackageStore from "@/app/store/selectedmockpackageStore";
import useTemporaryPhonenumberStore from "@/app/store/temporaryphonenumberStore";
import { useRouter } from "next/navigation";

export function MockPurchaseDialogCustom() {
  const { push } = useRouter();

  const mockPackageSelected = useSelectedMockPackageStore(
    (state) => state.mockpackage
  );
  const phoneNumberFetched = useTemporaryPhonenumberStore(
    (state) => state.phoneNumber
  );
  if (mockPackageSelected.discountStatus) {
  }

  useEffect(() => {
    console.log("Component mounted");
    if (mockPackageSelected.id == undefined) {
      push("/mock");
    }
  }, []); //

  //   const PackageId = props.packageId;
  //   const Price = props.price;
  //   const Price2 = props.price2;
  //   const Price3 = props.price3;

  const [data, setData] = useState<any[]>([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedPayemtOption, setSelectedPaymentOption] = useState("");

  const [accountNumber, setAccountNumber] = useState("");
  const [pageSection, setPageSection] = useState("paymentOptions");
  // const [selectedPrice, setSelectedPrice] = useState(Price);

  const [formData, setFormData] = useState({
    name: "",
    transaction_id: "",
  });

  const enableButton = () => {
    setIsButtonDisabled(false);
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

  const PackagePrice = mockPackageSelected?.discountStatus
    ? mockPackageSelected.temporaryPrice
    : mockPackageSelected.price;
  const additionalData = {
    mockPackageId: mockPackageSelected?.id,
    phoneNumber: phoneNumberFetched,
    price: PackagePrice,
    paymentMethod: selectedPayemtOption,
  };

  const updatedFormData = { ...formData, ...additionalData };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Perform the POST request here
    fetch(`${apiUrl}/mockexampackagepurchase`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data status:", data.status);
        console.log("FData:", data.message);

        if (data) {
          toast({
            title: `Success!`,
            description: `You have Orderd Your Package!`,
          });
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
        <div className="w-fit bg-primaryColor px-3 py-1 rounded shadow-lg shadow-black  text-white">
          <button>Enroll</button>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
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
              </div>
            </AlertDialogDescription>
            <AlertDialogFooter>
              <AlertDialogCancel
                onClick={() => {
                  setPageSection("paymentOptions");
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
              Note: Pay Birr{" "}
              <span className="text-primaryColor">
                {mockPackageSelected.discountStatus
                  ? mockPackageSelected.temporaryPrice
                  : mockPackageSelected.price}
              </span>{" "}
              to a{" "}
              <span className="text-primaryColor">{selectedPayemtOption}</span>{" "}
              account number:{" "}
              <span className="text-primaryColor">{accountNumber}</span>
            </h1>
            <AlertDialogDescription>
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="my-3">
                    <label>
                      Phone Number:{" "}
                      <span className="underline">{phoneNumberFetched}</span>
                    </label>
                  </div>
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
                        setPageSection("paymentOptions");
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
