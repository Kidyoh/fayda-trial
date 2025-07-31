    import React from "react";

const FeaturedCourse = () => {
  return (
    <div className="flex flex-col md:flex-row p-6 max-w-6xl mx-auto">
      {/* Left: Image */}
      <div className="relative w-full md:w-2/3">
        <img
          src="/Background/pricing.jpg"
          alt="Painless Pricing"
          className="w-full h-auto"
        />
        <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-4 py-1 rounded">
          BUY NOW
        </div>
      </div>

      {/* Right: Info */}
      <div className="mt-6 md:mt-0 md:ml-10 w-full md:w-1/3 flex flex-col justify-center">
        <h2 className="text-3xl font-bold text-gray-900">Painless Pricing</h2>
        <p className="text-gray-600 mt-4">
          Make pricing your creative work easy. Learn how to charge more and
          profit from every project.
        </p>
        <p className="text-xl font-semibold text-gray-900 mt-4">$1499</p>
        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded">
          LEARN MORE
        </button>
      </div>
    </div>
  );
};

export default FeaturedCourse;
