import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: ''
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.email = action.payload;
    }
  },
});

export const { setUserProfile } = userSlice.actions
export default userSlice.reducer;
