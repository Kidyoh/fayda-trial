
import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import type { Swiper as SwiperType } from 'swiper';

const images = [
  {
    src: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80',
    alt: 'School Hallway',
  },
  {
    src: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
    alt: 'Classroom',
  },
  {
    src: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=800&q=80',
    alt: 'School Books',
  },
  {
    src: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80',
    alt: 'School Playground',
  },
];

const AdSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const swiperRef = React.useRef<SwiperType | null>(null);

  // Auto scroll effect
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (swiperRef.current) {
        swiperRef.current.slideNext();
      }
    }, 3000); // 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full mx-auto pb-10 relative px-4">
      <Swiper
        onSwiper={swiper => (swiperRef.current = swiper)}
        loop={true}
        spaceBetween={20}
        slidesPerView={1}
        onSlideChange={swiper => setActiveIndex(swiper.realIndex)}
        className="mb-6 w-full"
        modules={[Autoplay]}
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={img.src}
              alt={img.alt}
              className="rounded-2xl max-w-7xl w-full h-[350px] md:h-[550px] object-cover mx-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="flex justify-center gap-4 mt-2">
        {images.map((img, idx) => (
          <button
            key={idx}
            className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors duration-200 ${activeIndex === idx ? 'bg-primary border-primary text-white' : 'bg-white border-gray-300 text-gray-500'}`}
            onClick={() => {
              swiperRef.current?.slideToLoop(idx);
              setActiveIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AdSlider;