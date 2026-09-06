import { useEffect } from "react";
import { api_options } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../store/moviesSlice";

const usePopularMovies = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const getPopularMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        api_options,
      );
      const json = await data.json();
      dispatch(addPopularMovies(json.results));
    };
    getPopularMovies();
  }, []);
};

export default usePopularMovies;
