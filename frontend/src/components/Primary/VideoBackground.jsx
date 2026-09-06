import { useSelector } from "react-redux";
import useMovieTrailer from "../../hooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerMovie);

  useMovieTrailer(movieId);

  return (
    <div className="relative w-full aspect-video overflow-hidden bg-black">
      <iframe
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] sm:w-[177.77vw] sm:h-[100vh] min-w-full min-h-full pointer-events-none object-cover scale-125 sm:scale-100"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1&controls=0&loop=1&playlist=" +
          trailerVideo?.key
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
      {/* Gradient overlays to blend into the Netflix UI */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none"></div>
    </div>
  );
};

export default VideoBackground;
