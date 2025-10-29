"use client";

import Image from "next/image";
import Link from "next/link";
import { PackageAddToCartButton } from "../cart/AddToCartButton";

interface PackageItem {
  id: string;
  packageName: string;
  packageDescription: string;
  price: string | number;
  imgUrl: string[];
  thumbnail?: string | null;
  tag?: string;
  courses?: unknown[];
  temporaryPrice?: string | number | null;
  discountStatus?: boolean;
  discountExpiryDate?: string | null;
}

interface PackageCardsClientProps {
  packages: PackageItem[];
}

function formatPrice(value: string | number | null | undefined): string {
  const num = typeof value === "string" ? Number(value) : (value ?? 0);
  return isNaN(Number(num)) ? "0" : Number(num).toLocaleString("en-ET");
}

function PackageCard({
  pkg,
  bg,
  border,
  text,
}: {
  pkg: PackageItem;
  bg: string;
  border: string;
  text: string;
}) {
  const imageSrc =
    pkg?.imgUrl?.[0] && pkg.imgUrl[0].startsWith("/")
      ? pkg.imgUrl[0]
      : "/common_files/main/cover.jpg";
  return (
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
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id={`pattern-${pkg.id}`}
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <polygon
                points="10,0 20,10 10,20 0,10"
                fill="currentColor"
                opacity="0.3"
              />
              <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url(#pattern-${pkg.id})`} />
        </svg>
      </div>

      {/* Image */}
      <div className="relative z-10 w-full h-32 mb-4 rounded-xl overflow-hidden">
        <Image
          src={imageSrc}
          alt={pkg.packageName}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          priority={false}
          onError={(e) => {
            const target = e.currentTarget as unknown as HTMLImageElement;
            target.src = "/common_files/main/cover.jpg";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-xs font-semibold text-[#07705d]">
            {pkg.tag || "Course"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="font-bold text-xl font-Sendako tracking-wide mb-4 leading-tight">
          {pkg.packageName}
        </div>
        <div className="text-xl font-extrabold mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-2xl">
          {pkg.discountStatus && pkg.temporaryPrice ? (
            <div className="flex flex-col items-center gap-1">
              <span className="line-through text-white/60 text-sm">
                {formatPrice(pkg.price)} Birr
              </span>
              <span>{formatPrice(pkg.temporaryPrice)} Birr</span>
            </div>
          ) : (
            <span>{formatPrice(pkg.price)} Birr</span>
          )}
        </div>

        <div className="text-white/90 text-sm space-y-3 text-left font-medium w-full pb-5">
          <div className="flex items-start">
            <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="leading-relaxed">{pkg.packageDescription}</span>
          </div>
          <div className="flex items-start">
            <div className="w-2 h-2 bg-white/80 rounded-full mt-2 mr-3 flex-shrink-0"></div>
            <span className="leading-relaxed">
              {pkg.courses?.length || 0} comprehensive courses
            </span>
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

        <div className="w-full mb-6 space-y-2">
          <PackageAddToCartButton
            packageData={pkg as any}
            className="w-full bg-white/90 backdrop-blur-sm text-[#07705d] hover:bg-white hover:text-[#07705d] border-2 border-white/50 font-bold py-2 px-6 rounded-2xl transition-all duration-200 hover:scale-105 shadow-lg"
            size="default"
          />
          <Link href={`/details/${pkg.id}`} className="w-full block">
            <button className="w-full bg-white/20 backdrop-blur-sm text-white font-bold py-2 px-6 rounded-2xl transition-all duration-200 hover:bg-white/30 border border-white/30 hover:scale-105">
              VIEW DETAILS
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PackageCardsClient({
  packages,
}: PackageCardsClientProps) {
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

  return (
    <section id="packages" className="pb-10 px-4">
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
          <PackageCard
            key={pkg.id}
            pkg={pkg}
            bg={cardStyles[i % cardStyles.length].bg}
            border={cardStyles[i % cardStyles.length].border}
            text={cardStyles[i % cardStyles.length].text}
          />
        ))}
      </div>
      {packages.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mb-4">
            <span className="text-3xl">📚</span>
          </div>
          <h3 className="text-xl font-Sendako font-semi bold text-black mb-2">
            No Featured Packages Available
          </h3>
          <p className="text-black/80 mb-6">
            Check back soon for new learning opportunities!
          </p>
        </div>
      )}
      {packages.length > 0 && (
        <div className="text-center mt-12">
          <Link href="/packages">
            <button className="bg-primaryColor backdrop-blur-sm text-white font-bold py-4 px-8 rounded-2xl border-2 transition-all duration-300 hover:scale-105">
              View All Packages
            </button>
          </Link>
        </div>
      )}
    </section>
  );
}
