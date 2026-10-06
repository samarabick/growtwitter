import { createAsyncThunk } from "@reduxjs/toolkit";
import { type LoginProps } from "../user/userService";
import { login as loginService } from "../user/userService";
import { getUser, getUserProfile } from "./userSlice";
import { getProfile as getProfileService } from "./../profile/profileService";
import type { GetProfileProps } from "../profile/profileService";

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

export const loadProfileUserLoggedThunk = createAsyncThunk(
  "profileUserLogged/loadProfileUserLogged",
  async ({ userToken, userId }: GetProfileProps, { dispatch }) => {
    const userLoggedProfile = await getProfileService({
      userToken: userToken,
      userId: userId,
    });
    dispatch(getUserProfile(userLoggedProfile));
  },
);
