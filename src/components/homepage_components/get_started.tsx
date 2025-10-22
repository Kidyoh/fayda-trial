import React from "react";
import Image from "next/image";

const GetStarted = () => {
  return (
    <div className="hidden xl:flex absolute left-4 top-1/2 -translate-y-1/2 w-[240px] h-auto flex-col items-center justify-center px-3">
      <div className="mb-4">
        <Image
          src="/Images/eth.png"
          alt="Ethiopia"
          width={80}
          height={80}
          className="w-24 xl:w-28 object-contain"
        />
      </div>

      <a href="#course">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-white hover:scale-105 active:scale-95 transition-all font-bold px-4 py-3 h-12 xl:h-14 text-base xl:text-lg font-Sendako rounded-full">
          Learn
        </button>
      </a>
    </div>
  );
};

export default GetStarted;
