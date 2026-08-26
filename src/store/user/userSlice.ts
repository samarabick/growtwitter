import { createSlice } from "@reduxjs/toolkit";
import { type User } from "../../types/index";

type InitialState = {
  user: User;
};

const initialState: InitialState = {
  user: {
    username: "",
    id: "",
    token: "",
    image: "",
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
  },
});

export const { getUser } = userSlice.actions;

export default userSlice.reducer;
