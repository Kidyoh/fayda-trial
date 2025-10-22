import Image from "next/image";
import MarqueeItem from "./marquee_item";

const Marquee = () => {
  const upperMarquee = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    { img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?20220821125323",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Unity_logo.svg/450px-Unity_logo.svg.png?20160727081127",
    },
  ];

  const lowerMarquee = [
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    },
    { img: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Spotify_icon.svg/768px-Spotify_icon.svg.png?20220821125323",
    },
    {
      img: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Unity_logo.svg/450px-Unity_logo.svg.png?20160727081127",
    },
  ];

  return (
    <div className="py-12 md:py-16 lg:py-28 px-4 md:px-8">
      <div className="max-w-4xl mx-auto relative flex flex-col items-center">
        <Image
          src="/svg/Asset 21.svg"
          alt="Courses"
          width={290}
          height={56}
          className="absolute w-full md:w-max top-3 left-1/2 -translate-x-1/2 z-10"
        />
        <h2 className="text-3xl md:text-4xl font-extrabold font-Sendako tracking-wide uppercase text-white z-20 my-8">
          Our Partners
        </h2>
      </div>
      <div className="w-full mx-auto overflow-hidden 2xl:h-auto flex flex-col justify-center">
        <MarqueeItem items={upperMarquee} from={0} to={"-100%"} />
        <MarqueeItem items={lowerMarquee} from={"-100%"} to={0} />
      </div>
    </div>
  );
};

export default Marquee;
