import { createSlice } from "@reduxjs/toolkit";

export const searchSlice = createSlice({
  name: "searchTerm",
  initialState: "",
  reducers: {
    updateSearchTerm: (_state, action) => {
        return action.payload;
    },
  },
});

export const { updateSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;