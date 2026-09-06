import MoviesCards from "./MoviesCards";

const MoviesList = ({ title, movies }) => {
  return (
    <div className="px-4 sm:px-8 md:px-12 py-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-3 tracking-wide">
        {title}
      </h2>
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] pb-4">
        {movies?.map((movie) => (
          <MoviesCards key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
