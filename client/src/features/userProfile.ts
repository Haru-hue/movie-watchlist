import { RootState } from "@/store/store";
import { createSlice } from "@reduxjs/toolkit";

type Profile = {
  userInfo: userInfo
}

const initialState: Profile = {
  userInfo: {
    username: '',
    email: '',
    avatar_url: '',
  }
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      (state.userInfo.email = action.payload),
        (state.userInfo.username = action.payload);
      state.userInfo.avatar_url = action.payload;
    },
    setTestProfile: (state, action) => {
      state.userInfo.email = action.payload;
    }
  },
});

export const { setTestProfile, setUserProfile } = userSlice.actions
export default userSlice.reducer;
