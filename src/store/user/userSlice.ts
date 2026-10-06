import { createSlice } from "@reduxjs/toolkit";
import { type UserProfile, type User } from "../../types/index";

type InitialState = {
  user: User;
  profileUser: UserProfile;
};

const initialState: InitialState = {
  user: {
    username: "",
    id: "",
    token: "",
    image: "",
  },
  profileUser: {
    followers: [],
    following: [],
    id: "",
    imageUrl: "",
    name: "",
    username: "",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state, action) => {
      state.user.username = action.payload.username;
      state.user.id = action.payload.id;
      state.user.token = action.payload.token;
      state.user.image = action.payload.image;
    },
    getUserProfile: (state, action) => {
      state.profileUser.followers = action.payload.followers;
      state.profileUser.following = action.payload.following;
      state.profileUser.id = action.payload.id;
      state.profileUser.imageUrl = action.payload.imageUrl;
      state.profileUser.name = action.payload.name;
      state.profileUser.username = action.payload.username;
    },
  },
});

export const { getUser } = userSlice.actions;
export const { getUserProfile } = userSlice.actions;

export default userSlice.reducer;
