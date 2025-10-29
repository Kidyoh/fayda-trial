"use client";
import { apiUrl } from "@/apiConfig";
import React, { useEffect, useState } from "react";
import CheckPhoneNumber from "../../mock_package_components/checkphonenumber";
import CheckPayment from "../../mock_package_components/checkpayment";
import useSelectedMockPackageStore from "@/app/store/selectedmockpackageStore";

export default function MockPackage({ params }: any) {
  const FolderName = params.foldername;
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(true);

  const setSelectedMockPackage = useSelectedMockPackageStore(
    (state) => state.setMockPackage,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `${apiUrl}/mockexampackage/tostudentselect/${FolderName}`,
          `${apiUrl}/mockexampackage/tostudentselectmain/${FolderName}`,
          {
            credentials: "include",
          },
        );

        const jsonData = await response.json();
        setData(jsonData);
        console.log("first");
        console.log("Data: ", jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const SetStorePackage = (data: any) => {
    console.log(" Result: " + JSON.stringify(data));
    setSelectedMockPackage(data);
  };

  return (
    <div className="my-4 ">
      <div className="w-full flex">
        <h1 className="w-fit  mx-auto text-2xl font-semibold text-primaryColor">
          Mock Exam Packages
        </h1>
      </div>

      {data?.map((packagex: any, index: number) => {
        return (
          <div key={index} className="md:grid grid-cols-3 my-6 mx-2 ">
            <div className="w-full md:w-1/2 mx-auto">
              <img
                // src={`${apiUrl}/upload_assets/images/mock_package_thumbnails/${packagex?.thumbnail}`}
                src={packagex?.imgUrl}
                alt="ThumbNail Image"
                className="mx-auto w-1/2 md:w-full rounded-lg bg-primaryColor"
              />
            </div>

            <div className="space-y-3 md:col-span-2 md:m-8 ">
              <h1 className="py-3 mx-auto w-fit md:w-full ">
                <span className="text-primaryColor"> Package Title: </span>{" "}
                {packagex?.title}
              </h1>
              <h1 className="text-center bg-fourthColor bg-opacity-30 p-3 rounded-xl">
                {" "}
                <span className="text-primaryColor"> Description:</span>{" "}
                {packagex?.description}
              </h1>
              {/* <h1>
                Price:{" "}
                {packagex?.price == "0"
                  ? "Free"
                  : (packagex?.discountStatus
                      ? packagex?.temporaryPrice
                      : packagex?.price) + " Birr"}
              </h1> */}

              <h1>
                <span className="text-primaryColor"> Price:</span>{" "}
                {packagex?.price == "0" ? (
                  "Free"
                ) : packagex?.discountStatus ? (
                  <span>
                    {" "}
                    <span className="line-through">{packagex?.price}</span>{" "}
                    <span>{packagex?.temporaryPrice}</span>
                  </span>
                ) : (
                  <span>{packagex?.price}</span>
                )}
                {/* <span>{" Birr"}</span> */}
              </h1>
              <h1>
                <span className="text-primaryColor">
                  {" "}
                  Number of Exams included:{" "}
                </span>
                {packagex?.Exams.length}
              </h1>

              {packagex?.Exams.map((exam: any, index: number) => {
                return (
                  <div key={index} className="">
                    <h1>
                      <span className="text-primaryColor">Exam Title: </span>
                      {exam.assesmentTitle}
                    </h1>
                    <h1 className="pl-5 bg-fourthColor bg-opacity-30">
                      {exam.assesmentDescription}
                    </h1>
                  </div>
                );
              })}

              {packagex.price != 0 ? (
                <div className="my-auto bg-yellow-200 w-full ">
                  <button
                    onClick={() => SetStorePackage(packagex)}
                    className="bg-primaryColor rounded-lg p-1 text-white "
                  >
                    {" "}
                    <CheckPayment mock_package_id={packagex.id} />
                  </button>
                </div>
              ) : (
                <div className="my-3 w-full flex ">
                  <button
                    onClick={() => SetStorePackage(packagex)}
                    className="bg-primaryColor mx-auto md:mx-3 rounded-lg p-1 text-white"
                  >
                    {" "}
                    <CheckPhoneNumber
                      mockPackageId={packagex.id}
                      pushto={`/mock_package/free_mock_package/${packagex.id}`}
                      //type={"testtest"}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
