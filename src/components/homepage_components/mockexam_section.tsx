import React from "react";
import { ScrollText } from "lucide-react";
import Link from "next/link";
import CheckPhoneNumber from "@/app/mock_package/mock_package_components/checkphonenumber";

export default function MockexamSection() {
  return (
    <div>
      <div className="w-full flex my-6">
        <h1 className="mx-auto font-semibold text-primaryColor text-2xl">
          Mock Exams
        </h1>
      </div>
      <div className="w-full ">
        <div className="grid grid-cols-3 border-4 rounded mx-4 p-5">
          <div className="group hover:bg-primaryColor duration-150 cursor-pointer mx-auto col-span-1 border-2 border-primaryColor p-5">
            <div className="">
              <div className="">
                <ScrollText
                  size={60}
                  className="mx-auto group-hover:text-white  duration-150 text-primaryColor"
                />
              </div>
              <div>
                <h1 className="group-hover:text-white  duration-150">
                  <CheckPhoneNumber pushto={"/mock_package"} />
                </h1>
              </div>
            </div>
          </div>

          <div className="col-span-2  my-auto ">
            <h1 className="my-auto text-center">
              The mock exam packages are specifically designed to assist
              students in preparing for their upcoming exams by simulating
              real-time exam scenarios. These packages provide students with a
              valuable opportunity to practice and refine their exam-taking
              skills under timed conditions.
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
