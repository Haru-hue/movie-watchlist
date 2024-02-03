import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState = {
  email: '',
  avatarURL: ''
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      const { email, avatarURL } = action.payload;
      state.email = email;
      state.avatarURL = avatarURL;
    }
  },
});

export const { setUserProfile } = userSlice.actions
export default userSlice.reducer;
