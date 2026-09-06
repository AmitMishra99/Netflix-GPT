import { PlayIcon, InformationCircleIcon } from "@heroicons/react/24/solid";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="absolute top-0 left-0 w-full aspect-video pt-[10%] sm:pt-[12%] px-6 sm:px-12 md:px-16 flex flex-col justify-start bg-gradient-to-r from-black/90 via-black/40 to-transparent z-10 text-white select-none pointer-events-none">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide drop-shadow-md max-w-xl md:max-w-2xl line-clamp-1 sm:line-clamp-2">
        {title}
      </h1>
      <p className="hidden sm:block text-xs sm:text-sm md:text-base font-normal text-gray-300 mt-3 max-w-xs sm:max-w-md md:max-w-lg line-clamp-3 drop-shadow">
        {overview}
      </p>
      <div className="flex items-center gap-3 mt-4 sm:mt-5 pointer-events-auto">
        <button className="flex items-center gap-2 bg-white text-black px-5 sm:px-7 py-2 sm:py-2.5 rounded-md font-semibold text-xs sm:text-sm md:text-base hover:bg-opacity-80 transition-all duration-300 shadow-lg cursor-pointer">
          <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />
          Play
        </button>
        <button className="flex items-center gap-2 bg-gray-600/70 text-white px-5 sm:px-6 py-2 sm:py-2.5 rounded-md font-medium text-xs sm:text-sm md:text-base backdrop-blur-md hover:bg-gray-600/50 transition-all duration-300 shadow-lg cursor-pointer">
          <InformationCircleIcon className="w-5 h-5 sm:w-6 sm:h-6" />
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
