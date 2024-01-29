import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  term: ''
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setMovieTerm: (state, action) => {
      state.term = action.payload;
    }
  },
});

export const { setMovieTerm } = movieSlice.actions
export default movieSlice.reducer;
