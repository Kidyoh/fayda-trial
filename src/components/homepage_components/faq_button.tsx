import React from 'react'
import Image from 'next/image'; // If you're using Next.js

const FAQButton = () => {

    return (
        <div className="hidden lg:flex absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 w-[90%] sm:w-[280px] h-auto flex-col items-center justify-center px-4">
            <div>
                <Image src="/Images/Axum.png" alt="App Icon" width={80} height={80} className="w-12 object-contain" />  
            </div>

            <button className="bg-yellow-400 hover:bg-yellow-300 text-white hover:scale-105 active:scale-95 transition-all font-bold w-full sm:w-52 h-12 sm:h-16 text-xl sm:text-3xl font-Sendako rounded-full mb-6 sm:mb-8">
                FAQ
            </button>

            <div className="flex gap-4 h-8" />
        </div>

    )
}

export default FAQButton