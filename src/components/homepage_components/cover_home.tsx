"use client";

import Image from "next/image";
import ScrollDown from "./scroll_down";
import ShinyText from "../custom_components/shiny_text";

export default function CoverHome() {
  return (
    <div className="relative min-h-screen w-full bg-[url(/Background/landing-bg.jpg)] bg-cover bg-center bg-no-repeat">
      
      {/* Main content wrapper */}
      <div className="relative min-h-screen flex flex-col items-center justify-center">
        
        {/* Account for fixed navbar space */}
        <div className="pt-20 xxmd:pt-24 pb-20 xxmd:pb-8 px-4 xxsm:px-5 xsm:px-6 sm:px-8 ssmd:px-10 md:px-12 lg:px-16 xl:px-24 w-full max-w-6xl lg:max-w-5xl xl:max-w-6xl mx-auto">
        
        <h1 className="sr-only">let&lsquo;s embark on this knowledge journey!</h1>

          {/* Main content container with proper spacing */}
          <div className="flex flex-col items-center text-center space-y-3 xxsm:space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 xl:space-y-10">
          
            {/* Hero title with comprehensive responsive text sizing */}
            <div className="relative w-full max-w-3xl lg:max-w-4xl xl:max-w-5xl mx-auto">
              <h1 className="relative text-xl xxsm:text-2xl xsm:text-3xl sm:text-4xl ssmd:text-4xl md:text-5xl lg:text-5xl xl:text-6xl xxl:text-7xl leading-[1.05] xxsm:leading-[1.1] sm:leading-[1.15] md:leading-[1.2] text-white font-Sendako uppercase">
                <ShinyText
                  text="let&lsquo;s embark on this knowledge journey!"
                  disabled={false}
                  speed={5} />
                
                {/* Responsive decoration icon */}
                <Image
                  src="/svg/Asset 9.svg"
                  alt="text decoration"
                  width={20}
                  height={20}
                  className="w-4 h-4 xxsm:w-5 xxsm:h-5 xsm:w-6 xsm:h-6 sm:w-8 sm:h-8 ssmd:w-10 ssmd:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 absolute -top-2 xxsm:-top-2.5 xsm:-top-3 sm:-top-4 ssmd:-top-5 md:-top-6 lg:-top-8 xl:-top-10 left-0 xxsm:-left-0.5 sm:-left-1 md:-left-2 lg:-left-3 xl:-left-4 pointer-events-none"
                />
              </h1>
            </div>
          
            {/* Main banner image with improved responsive sizing */}
            <div className="relative w-full max-w-2xl sm:max-w-3xl md:max-w-3xl lg:max-w-3xl xl:max-w-4xl mx-auto">
              <Image
                src="/common_files/main/bannerx01.jpg"
                alt="Landing Image"
                width={700}
                height={500}
                className="w-full h-auto bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl"
                priority
              />
            </div>
            
             {/* Download Our App section */}
             <div className="w-full max-w-lg mx-auto">
               {/* Download section header */}
               <div className="flex items-center justify-center gap-3 mb-6">
                 <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                   <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                     <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                   </svg>
                   <span className="text-white text-sm font-medium">Download Our App</span>
                 </div>
                 <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent flex-1"></div>
               </div>

               {/* App store buttons - using the style from GetStarted component, visible on all screen sizes */}
               <div className="flex flex-col lg:flex-row items-center justify-center gap-2 xxsm:gap-3 sm:gap-4 md:gap-5 lg:gap-6">
                 <a href="https://apps.apple.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-200">
                   <Image 
                     src="/logos/app-store.png" 
                     alt="App Store" 
                     width={140} 
                     height={50} 
                     className="w-28 h-auto xxsm:w-32 xsm:w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52"
                   />
                 </a>
                 <a href="https://play.google.com" target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-200">
                   <Image 
                     src="/logos/play-store.png" 
                     alt="Play Store" 
                     width={140} 
                     height={50} 
                     className="w-28 h-auto xxsm:w-32 xsm:w-36 sm:w-40 md:w-44 lg:w-48 xl:w-52"
                   />
                 </a>
               </div>
             </div>
          </div>
        </div>
        
        {/* Desktop side buttons - only visible on large screens */}
        <div className="hidden xl:flex absolute left-8 top-1/2 -translate-y-1/2 w-[200px] h-auto flex-col items-center justify-center px-3 z-20">
          <div className="mb-4">
            <Image src="/Images/eth.png" alt="Ethiopia" width={80} height={80} className="w-20 xl:w-24 object-contain" />
          </div>
          <a href='#course'>
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white hover:scale-105 active:scale-95 transition-all font-bold px-6 py-3 h-12 xl:h-14 text-base xl:text-lg font-Sendako rounded-full shadow-lg hover:shadow-xl">
              Learn More
            </button>
          </a>
        </div>

        <div className="hidden xl:flex absolute right-8 top-1/2 -translate-y-1/2 w-[200px] h-auto flex-col items-center justify-center px-3 z-20">
          <div className="mb-4">
            <Image src="/Images/eth.png" alt="Ethiopia" width={80} height={80} className="w-20 xl:w-24 object-contain" />  
          </div>
          <a href="/faq">
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white hover:scale-105 active:scale-95 transition-all font-bold px-6 py-3 h-12 xl:h-14 text-base xl:text-lg font-Sendako rounded-full shadow-lg hover:shadow-xl">
              FAQ
            </button>
          </a>
        </div>
      </div>
      
      {/* Decorative element with improved responsive positioning */}
      <Image
        src="/svg/Asset 20.svg"
        alt="Decorative element"
        width={20}
        height={20}
        className="w-12 h-12 xxsm:w-14 xxsm:h-14 xsm:w-16 xsm:h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32 absolute bottom-4 xxsm:bottom-6 sm:bottom-8 md:bottom-12 lg:bottom-16 xl:bottom-20 xxmd:bottom-24 z-10 right-[5%] xxsm:right-[6%] xsm:right-[7%] sm:right-[8%] md:right-[10%] lg:right-[12%] xl:right-[15%] xxmd:right-[18%]"
      />
      
      {/* Mobile/Tablet floating buttons - positioned to avoid navbar conflicts */}
      <div className="xl:hidden fixed bottom-8 left-6 right-6 z-40 flex justify-between items-end pointer-events-none">
        {/* Learn More floating button */}
        <div className="pointer-events-auto">
          <a href='#course' className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#07705d] to-[#c7cc3f] backdrop-blur-sm rounded-full shadow-2xl border-2 border-white/30 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-3xl">
              <Image src="/Images/eth.png" alt="Ethiopia" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-4 py-2 text-sm font-Sendako rounded-full shadow-2xl border-2 border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-3xl">
              Learn More
            </button>
          </a>
        </div>

        {/* FAQ floating button */}
        <div className="pointer-events-auto">
          <a href="/faq" className="flex flex-col items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-[#07705d] to-[#c7cc3f] backdrop-blur-sm rounded-full shadow-2xl border-2 border-white/30 flex items-center justify-center hover:scale-110 transition-all duration-300 hover:shadow-3xl">
              <Image src="/Images/eth.png" alt="Ethiopia" width={24} height={24} className="w-6 h-6 object-contain" />
            </div>
            <button className="bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-bold px-4 py-2 text-sm font-Sendako rounded-full shadow-2xl border-2 border-white/20 hover:scale-105 active:scale-95 transition-all duration-200 hover:shadow-3xl">
              FAQ
            </button>
          </a>
        </div>
      </div>

       {/* Action components */}
       <ScrollDown />
    </div>
  );
}

