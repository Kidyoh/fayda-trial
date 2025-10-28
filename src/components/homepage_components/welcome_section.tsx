import Image from "next/image";
import WelcomeVideo from "./welcome_video";

/**
 * Server Component for Welcome Section
 * Handles static content, images, and layout
 * Renders the welcome section with statistics and video
 */
export default function WelcomeSection() {
  return (
    <div className="relative pb-10 lg:pb-0 pt-10 overflow-hidden px-4">
      <section className="max-w-7xl mx-auto md:h-screen flex items-center justify-center relative">
        <Image
          src="/Images/TestTubes.png"
          alt="Welcome"
          width={800}
          height={600}
          className="w-72 absolute bottom-10 left-[15%] z-0 hidden md:flex object-contain"
        />
        <Image
          src="/Images/equation.png"
          alt="Welcome"
          width={800}
          height={600}
          className="w-72 absolute left-1/4 top-1/3  z-0 hidden md:flex object-contain"
        />
        <Image
          src="/svg/Asset 6.svg"
          alt="Welcome"
          width={80}
          height={60}
          className="w-24 absolute bottom-10 right-[10%] z-0 object-contain"
        />
        <Image
          src="/svg/Asset 5.svg"
          alt="Welcome"
          width={80}
          height={60}
          className="w-12 first-letter:md:w-24 absolute left-[60%] md:left-[40%] top-1/3 md:top-20  z-0  object-contain"
        />
        <div className="w-full mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-snug font-Sendako">
              Learn at your own pace, <br />
              Succeed at your own rate
            </h1>

            <div className="flex flex-col gap-4 text-black font-Sendako">
              <div className="text-5xl md:text-7xl font-bold">
                500<span className="text-orange-500">+</span>{" "}
                <span className="block text-sm font-normal text-gray-600">
                  Active Resource
                </span>
              </div>
              <div className="text-5xl md:text-7xl font-bold">
                1000<span className="text-orange-500">+</span>{" "}
                <span className="block text-sm font-normal text-gray-600">
                  Active Student
                </span>
              </div>
            </div>
          </div>

          <Image
            src="/Images/Brush.png"
            alt="Welcome"
            width={800}
            height={600}
            className="w-[55%] absolute top-0 right-0 z-0 hidden md:flex object-contain"
          />

          {/* Client-side interactive video */}
          <WelcomeVideo />
        </div>
      </section>
    </div>
  );
}
