import React from "react";
import Image from "next/image";

const FAQButton = () => {
  return (
    <div className="hidden xl:flex absolute right-4 top-1/2 -translate-y-1/2 w-[240px] h-auto flex-col items-center justify-center px-3">
      <div className="mb-4">
        <Image
          src="/Images/eth.png"
          alt="Ethiopia"
          width={80}
          height={80}
          className="w-24 xl:w-28 object-contain"
        />
      </div>

      <a href="/faq">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-white hover:scale-105 active:scale-95 transition-all font-bold px-6 py-3 h-12 xl:h-14 text-lg xl:text-xl font-Sendako rounded-full">
          FAQ
        </button>
      </a>
    </div>
  );
};

export default FAQButton;
