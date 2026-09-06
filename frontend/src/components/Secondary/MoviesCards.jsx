import React from "react";
import { img_cdn } from "../../utils/constants";

const MoviesCards = ({ posterPath }) => {
  if (!posterPath) return null;
  return (
    <div className="w-32 sm:w-36 md:w-44 flex-shrink-0 cursor-pointer transform hover:scale-105 transition duration-300 ease-in-out">
      <img
        className="rounded-md object-cover aspect-[2/3] w-full shadow-lg"
        src={img_cdn + posterPath}
        alt="Movie Card"
      />
    </div>
  );
};

export default MoviesCards;
