import { createSlice } from "@reduxjs/toolkit";
import { type UserProfile } from "../../types/index";

const initialState: UserProfile = {
  followers: [],
  following: [],
  id: "",
  imageUrl: "",
  name: "",
  username: "",
};

const profileSlice = createSlice({
  name: "profileSlice",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.followers = action.payload.followers;
      state.following = action.payload.following;
      state.id = action.payload.id;
      state.imageUrl = action.payload.imageUrl;
      state.name = action.payload.name;
      state.username = action.payload.username;
    },
  },
});

export const { getProfile } = profileSlice.actions;

export default profileSlice.reducer;
