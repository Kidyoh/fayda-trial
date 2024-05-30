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
    (state) => state.setMockPackage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `${apiUrl}/mockexampackage/tostudentselect/${FolderName}`,
          `${apiUrl}/mockexampackage/tostudentselectmain/${FolderName}`,
          {
            credentials: "include",
          }
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

      <div className="ssmd:grid grid-cols-2 xxmd:grid-cols-3 gap-6 my-6 mx-2 ">
        {data?.map((packagex: any, index: number) => {
          return (
            <div key={index}>
              <div className="w-3/4 mx-auto">
                <div className="relative">
                  <img
                    // src={`${apiUrl}/upload_assets/images/mock_package_thumbnails/${packagex?.thumbnail}`}
                    src={packagex?.imgUrl}
                    alt="ThumbNail Image"
                    className="mx-auto  w-full rounded-t-lg bg-primaryColor"
                  />
                  <div className="absolute bottom-0 w-full bg-primaryColor text-white bg-opacity-60 py-2">
                    <h1 className="text-center"> {packagex.title}</h1>
                  </div>
                </div>
                <div className="p-2 bg-primaryColor text-white">
                  <h1 className="text-center text-sm">
                    <span>{packagex?.description}</span>
                  </h1>
                </div>
                <div className="px-5 py-1 flex justify-between">
                  <h1 className="text-sm">
                    Price:{" "}
                    {packagex.price == "0" ? (
                      <span className="text-primaryColor ">Free</span>
                    ) : (
                      packagex.price
                    )}
                  </h1>
                  <h1 className="text-sm">Exams: {packagex?.Exams.length}</h1>
                </div>
              </div>

              <div className="w-fit mx-auto">
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
    </div>
  );
}
