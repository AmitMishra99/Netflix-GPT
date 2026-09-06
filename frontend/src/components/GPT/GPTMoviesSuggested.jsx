import { useSelector } from "react-redux";
import MoviesList from "../Secondary/MoviesList";

const GPTMoviesSuggested = () => {
  const { moviesTitle, moviesRes } = useSelector((store) => store.gpt);
  if (!moviesTitle) return null;

  return (
    <div className="bg-black/80 backdrop-blur-md py-6 px-4 sm:px-8 md:px-12 mt-8 rounded-2xl border border-gray-800/80 shadow-2xl">
      <div className="flex flex-col gap-6">
        {moviesTitle.map((movie, index) => (
          <MoviesList key={index} title={movie} movies={moviesRes[index]} />
        ))}
      </div>
    </div>
  );
};

export default GPTMoviesSuggested;
