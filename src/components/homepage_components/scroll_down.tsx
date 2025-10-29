import React from "react";

const ScrollDown = () => {
  return (
    <div className="absolute -right-[116px] lg:-right-28 top-1/2 transform -translate-y-1/2 flex flex-row items-center justify-center gap-4 rotate-90">
      <p className="text-white md:font-bold text-sm">SCROLL DOWN</p>
      <div className="w-36 h-[1px] bg-white" />
    </div>
  );
};

export default ScrollDown;
