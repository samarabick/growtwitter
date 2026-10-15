import { createSlice } from "@reduxjs/toolkit";
import { type Author } from "../../types/index";
import { loadProfileThunk } from "./profileThunks";

type ProfileType = {
  followers: Author[];
  following: Author[];
  id: string;
  imageUrl: string;
  name: string;
  username: string;
  isProfileLoading: boolean;
};

const initialState: ProfileType = {
  followers: [],
  following: [],
  id: "",
  imageUrl: "",
  name: "",
  username: "",
  isProfileLoading: false,
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

  extraReducers: (builder) => {
    builder
      .addCase(loadProfileThunk.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(loadProfileThunk.fulfilled, (state) => {
        state.isProfileLoading = false;
      })
      .addCase(loadProfileThunk.rejected, (state) => {
        state.isProfileLoading = false;
      });
  },
});

export const { getProfile } = profileSlice.actions;

export default profileSlice.reducer;
