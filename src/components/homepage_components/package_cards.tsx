import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/apiConfig";

// Package interface based on API structure
interface Package {
  id: string;
  packageName: string;
  packageDescription: string;
  price: number;
  imgUrl: string;
  tag: string;
  courses?: any[];
}

type CardProps = {
  package: Package;
  bg: string;
  border: string;
  text: string;
};

const Card: React.FC<CardProps> = ({ package: pkg, bg, border, text }) => (
  <div
    className={`
      relative flex flex-col items-center p-8
      ${bg} ${border} ${text}
      transition-all duration-300
      hover:-translate-y-2 hover:scale-[1.02]
      min-h-[400px] w-full rounded-2xl
      overflow-hidden group
    `}
  >
    {/* Ethiopian Pattern Overlay */}
    <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id={`pattern-${pkg.id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <polygon points="10,0 20,10 10,20 0,10" fill="currentColor" opacity="0.3" />
            <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#pattern-${pkg.id})`} />
      </svg>
    </div>

    {/* Package Image */}
    <div className="relative z-10 w-full h-32 mb-4 rounded-xl overflow-hidden">
      {pkg.imgUrl ? (
        <img
          src={pkg.imgUrl}
          alt={pkg.packageName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback to a gradient background if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center">
          <span className="text-4xl">📚</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
        <span className="text-xs font-semibold text-[#07705d]">{pkg.tag || 'Course'}</span>
      </div>
    </div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="font-bold text-xl font-Sendako tracking-wide mb-4 text-center leading-tight">
        {pkg.packageName}
      </div>
      <div className="text-xl font-extrabold mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
        {pkg.price} Birr
      </div>

      <Link href={`/package_2/${pkg.id}`} className="w-full mb-6">
        <button className="w-full bg-white text-[#07705d] font-bold py-3 px-6 rounded-2xl transition-all duration-200 hover:bg-white/90 hover:scale-105 group-hover:shadow-lg border-2 border-transparent hover:border-white/30">
          BUY NOW
        </button>
      </Link>

      <div className="text-white/90 text-sm space-y-3 text-left font-medium w-full">
        <div className="flex items-start">
          <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
          <span className="leading-relaxed">{pkg.packageDescription}</span>
        </div>
        <div className="flex items-start">
          <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
          <span className="leading-relaxed">{pkg.courses?.length || 0} comprehensive courses</span>
        </div>
        <div className="flex items-start">
          <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
          <span className="leading-relaxed">Lifetime access included</span>
        </div>
        <div className="flex items-start">
          <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
          <span className="leading-relaxed">Certificate of completion</span>
        </div>
      </div>
    </div>
  </div>
); export default function PackageCards() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define styling for each card
  const cardStyles = [
    {
      bg: "bg-gradient-to-br from-[#07705d] to-[#bf8c13]",
      border: "border-2 border-[#c7cc3f]",
      text: "text-white",
    },
    {
      bg: "bg-gradient-to-br from-[#bf8c13] to-[#c7cc3f]",
      border: "border-2 border-[#07705d]",
      text: "text-white",
    },
  ];

  useEffect(() => {
    const fetchFeaturedPackages = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiUrl}/packages/fetchPackagesall/`, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch packages");
        }

        const data = await response.json();
        // Get first 2 packages as featured
        const featuredPackages = data.slice(0, 2);
        setPackages(featuredPackages);
        console.log("Featured packages fetched:", featuredPackages);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedPackages();
  }, []);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gradient-to-br from-[#c7cc3f]/20 to-[#bf8c13]/20 rounded-2xl h-[400px] w-full"></div>
    </div>
  );

  if (isLoading) {
    return (
      <div className="pb-10 md:pb-20 px-4">
        <div className="max-w-4xl mx-auto mb-12 relative flex flex-col items-center">
          <h2 className="text-3xl md:text-5xl font-extrabold font-Sendako tracking-wide uppercase text-white my-8">
            Featured Packages
          </h2>
        </div>
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <LoadingSkeleton />
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10 px-4">

      <div className="max-w-4xl mx-auto relative flex flex-col items-center mb-4">
        <Image
          src="/svg/Asset 21.svg"
          alt="Courses"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          Featured Packages
        </h2>
      </div>


      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {packages.map((pkg, i) => (
          <Card
            key={pkg.id}
            package={pkg}
            bg={cardStyles[i % cardStyles.length]?.bg || cardStyles[0].bg}
            border={cardStyles[i % cardStyles.length]?.border || cardStyles[0].border}
            text={cardStyles[i % cardStyles.length]?.text || cardStyles[0].text}
          />
        ))}
      </div>

      {/* Call to Action */}
      <div className="text-center mt-12">
        <Link href="/searchPackages">
          <button className="bg-primaryColor backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105">
            View All Packages
          </button>
        </Link>
      </div>

      {/* No packages fallback */}
      {!isLoading && packages.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No Featured Packages Available</h3>
          <p className="text-white/80 mb-6">Check back soon for new learning opportunities!</p>
          <Link href="/searchPackages">
            <button className="bg-white text-[#07705d] font-bold py-3 px-6 rounded-2xl hover:bg-white/90 transition-colors">
              Browse All Packages
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}