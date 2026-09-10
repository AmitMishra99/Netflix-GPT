import { useSelector } from "react-redux";
import MoviesList from "./MoviesList";
import Loader from "../Loader"

const SecondayContainer = () => {
  const movies = useSelector((store) => store.movies);

  if (movies.loadingCount > 0) {
    return (
      <Loader/>
    );
  }

  return (
    movies && (
      <div className="bg-black text-white pb-16">
        <div className="-mt-32 sm:-mt-48 md:-mt-64 relative z-20 pl-4 sm:pl-8 md:pl-12">
          <MoviesList title={"Now Playing"} movies={movies.nowPlayingMovies} />

          <MoviesList title={"Trending Now"} movies={movies.trendingMovies} />

          <MoviesList title={"Popular"} movies={movies.popularMovies} />

          <MoviesList
            title={"Upcoming Movies"}
            movies={movies.upcomingMovies}
          />
        </div>
      </div>
    )
  );
};

export default SecondayContainer;
