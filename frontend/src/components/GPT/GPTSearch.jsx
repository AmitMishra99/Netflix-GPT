import React, { useState } from "react";
import { api_options } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addGPTMovies, setGPTLoading } from "../../store/gptSlice";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import GPTMoviesSuggested from "./GPTMoviesSuggested";
import api from "../../utils/axios";

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const searchMovie = async (movies) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movies +
        "&include_adult=false&language=en-US&page=1",
      api_options,
    );

    const json = await data.json();
    return json.results;
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    dispatch(setGPTLoading(true));

    try {
      const response = await api.post("/gpt/search", {
        query: searchTerm,
      });

      const gptMovies = response.data.movies;

      const promiseArray = gptMovies.map((movie) => searchMovie(movie));
      const data = await Promise.all(promiseArray);

      dispatch(
        addGPTMovies({
          moviesTitle: gptMovies,
          moviesRes: data,
        }),
      );
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setGPTLoading(false));
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-24 sm:pt-28 px-4 sm:px-8 md:px-16">
      <div className="max-w-3xl mx-auto pt-6">
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-col sm:flex-row gap-3 bg-gray-900/90 border border-gray-800 p-3 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md"
        >
          <div className="relative flex-grow flex items-center">
            <MagnifyingGlassIcon className="absolute left-4 w-5 h-5 text-gray-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="What would you like to watch today?"
              className="w-full pl-12 pr-4 py-3 bg-black/60 text-white placeholder-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-600 text-sm sm:text-base border border-gray-800 transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl text-sm sm:text-base shadow-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Search</span>
          </button>
        </form>
      </div>

      <GPTMoviesSuggested />
    </div>
  );
};

export default SearchPage;
