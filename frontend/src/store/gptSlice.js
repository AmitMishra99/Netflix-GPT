import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "GPT",

  initialState: {
    showGPTSearch: false,
    moviesRes: null,
    moviesTitle: null,
    loading: false,
  },

  reducers: {
    toggleGPTSearch: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },

    addGPTMovies: (state, action) => {
      const { moviesTitle, moviesRes } = action.payload;

      state.moviesTitle = moviesTitle;
      state.moviesRes = moviesRes;
    },
    setGPTLoading: (state, action) => {
      state.loading = action.payload;
    },
    clearGPTMovies: (state) => {
      state.showGPTSearch = false;
      state.moviesTitle = null;
      state.moviesRes = null;
    },
  },
});

export const { toggleGPTSearch, addGPTMovies, setGPTLoading, clearGPTMovies } =
  gptSlice.actions;

export default gptSlice.reducer;
