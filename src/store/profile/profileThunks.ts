import { createAsyncThunk } from "@reduxjs/toolkit";
import { type GetProfileProps } from "./profileService";
import { getProfile as getProfileService } from "./profileService";
import {
  followProfile as followProfileService,
  unfollowProfile as unfollowProfileService,
} from "./profileService";
import { getProfile as getProfileSlice } from "./profileSlice";
import { loadProfileUserLoggedThunk } from "../user/userThunks";
import axios from "axios";

export const loadProfileThunk = createAsyncThunk(
  "profile/loadProfile",
  async (
    { userToken, userId }: GetProfileProps,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const profile = await getProfileService({
        userToken: userToken,
        userId: userId,
      });
      dispatch(getProfileSlice(profile));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue("Não foi possível carregar o perfil");
      }
    }
  },
);

interface FollowUnfollowProps {
  userToken: string;
  userId: string;
  userLoggedId: string;
}

export const followProfileThunk = createAsyncThunk(
  "profile/followProfile",
  async (
    { userToken, userId, userLoggedId }: FollowUnfollowProps,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const result = await followProfileService({
        userToken: userToken,
        userId: userId,
      });
      dispatch(
        loadProfileUserLoggedThunk({
          userId: userLoggedId,
          userToken: userToken,
        }),
      );
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(loadProfileThunk({ userId: userId, userToken: userToken }));
        return rejectWithValue("Não foi possível seguir. Tente novamente.");
      }
    }
  },
);

export const unfollowProfileThunk = createAsyncThunk(
  "profile/unfollowProfile",
  async (
    { userToken, userId, userLoggedId }: FollowUnfollowProps,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const result = await unfollowProfileService({
        userToken: userToken,
        userId: userId,
      });
      dispatch(
        loadProfileUserLoggedThunk({
          userId: userLoggedId,
          userToken: userToken,
        }),
      );
      return result;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        dispatch(loadProfileThunk({ userId: userId, userToken: userToken }));
        return rejectWithValue(
          "Não foi possível deixar de seguir. Tente novamente.",
        );
      }
    }
  },
);
