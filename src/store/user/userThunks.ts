import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LoginProps } from "../user/userService";
import { login as loginService } from "../user/userService";
import { getUser } from "./userSlice";

export const loadLogin = createAsyncThunk(
  "login/loadLogin",
  async ({ username, password }: LoginProps, { dispatch }) => {
    const user = await loginService({ username: username, password: password });
    dispatch(
      getUser({
        username: user.authUser.username,
        id: user.authUser.id,
        token: user.authToken,
        image: user.authUser.imageUrl,
      }),
    );
  },
);
