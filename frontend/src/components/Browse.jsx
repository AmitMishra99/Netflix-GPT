import { useDispatch, useSelector } from "react-redux";
import PrimaryContainer from "./Primary/PrimaryContainer";
import SecondayContainer from "./Secondary/SecondayContainer";
import usePopularMovies from "../hooks/usePopularMovies";
import useNowPlayingMovies from "../hooks/useNowPlayingMovies";
import useTrendingMovies from "../hooks/useTrendingMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import { clearGPTMovies, toggleGPTSearch } from "../store/gptSlice";
import GPTPage from "./GPT/GPTPage";
import {
  MagnifyingGlassIcon,
  HomeIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/solid";
import api from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { removeUser } from "../store/userSlice";
import { clearMovies } from "../store/moviesSlice";

const Browse = () => {
  const showGPTSearch = useSelector((store) => store.gpt.showGPTSearch);
  const user = useSelector((store) => store.user);

console.log("Redux user:", user);
console.log("Avatar URL:", user?.photoURL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useNowPlayingMovies();
  usePopularMovies();
  useTrendingMovies();
  useUpcomingMovies();

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", {});
      await signOut(auth);
      dispatch(removeUser());
      dispatch(clearMovies());
      dispatch(clearGPTMovies());
      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleGPTSeachClick = () => {
    dispatch(toggleGPTSearch());
  };

  return (
    <div className="bg-black min-h-screen text-white relative">
      {/* Top Navigation Bar */}
      <header className="absolute top-0 left-0 w-full z-30 px-4 sm:px-8 py-4 flex justify-end items-center gap-3 sm:gap-4 bg-gradient-to-b from-black/80 via-black/40 to-transparent">
        {/* GPT Search / Home Toggle Button */}
        <button
          onClick={handleGPTSeachClick}
          className="flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-gradient-to-r from-red-600 to-rose-600 text-white font-medium text-xs sm:text-sm rounded-full shadow-lg hover:from-red-700 hover:to-rose-700 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          {showGPTSearch ? (
            <>
              <HomeIcon className="w-4 h-4" />
              <span>Home</span>
            </>
          ) : (
            <>
              <span>GPT Search</span>
              <MagnifyingGlassIcon className="w-4 h-4" />
            </>
          )}
        </button>

        {/* User Profile Avatar */}
        {user?.avatar && (
          <img
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 border-gray-700 object-cover shadow-md"
            src={user?.photoURL || user?.avatar}
            alt={user?.name || "User Profile"}
          />
        )}

        {/* Sign Out Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-gray-900/80 hover:bg-red-600 text-gray-200 hover:text-white font-medium text-xs sm:text-sm rounded-full border border-gray-700 hover:border-red-600 transition-all duration-300 shadow-lg cursor-pointer"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          <span className="hidden sm:inline">Sign Out</span>
        </button>
      </header>

      {/* Main Content Switcher */}
      <main>
        {showGPTSearch ? (
          <GPTPage />
        ) : (
          <>
            <PrimaryContainer />
            <SecondayContainer />
          </>
        )}
      </main>
    </div>
  );
};

export default Browse;
