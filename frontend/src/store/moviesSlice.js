import { createSlice } from "@reduxjs/toolkit";

const moviesSlice = createSlice({
  name: "movies",

  initialState: {
    trailerMovie: null,
    nowPlayingMovies: null,
    popularMovies: null,
    trendingMovies: null,
    upcomingMovies: null,
    loadingCount:4
  },

  reducers: {
    addTrailerMovie: (state, action) => {
      state.trailerMovie = action.payload;
    },

    addNowPlayingMovies: (state, action) => {
      state.nowPlayingMovies = action.payload;
      state.loadingCount -= 1;
    },

    addPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
      state.loadingCount -= 1;
    },

    addTrendingMovies: (state, action) => {
      state.trendingMovies = action.payload;
      state.loadingCount -= 1;
    },

    addUpcomingMovies: (state, action) => {
      state.upcomingMovies = action.payload;
      state.loadingCount -= 1;
    },

    clearMovies: (state) => {
      state.trailerMovie = null;
      state.nowPlayingMovies = null;
      state.popularMovies = null;
      state.trendingMovies = null;
      state.upcomingMovies = null;
    },
  },
});

export const {
  addTrailerMovie,
  addNowPlayingMovies,
  addPopularMovies,
  addTrendingMovies,
  addUpcomingMovies,
  clearMovies,
} = moviesSlice.actions;

export default moviesSlice.reducer;
