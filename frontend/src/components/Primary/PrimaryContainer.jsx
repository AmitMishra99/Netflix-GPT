import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";
import { useSelector } from "react-redux";

const PrimaryContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  if (!movies) return; // Early Check

  const mainMovie = movies[0];
  const { title, overview, id } = mainMovie;

  return (
    <div className="overflow-x-hidden">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default PrimaryContainer;
