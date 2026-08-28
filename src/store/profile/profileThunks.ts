import { createAsyncThunk } from "@reduxjs/toolkit";
import { type GetProfileProps } from "./profileService";
import { getProfile as getProfileService } from "./profileService";
import {
  followProfile as followProfileService,
  unfollowProfile as unfollowProfileService,
} from "./profileService";
import { getProfile as getProfileSlice } from "./profileSlice";

export const loadProfileThunk = createAsyncThunk(
  "profile/loadProfile",
  async ({ userToken, userId }: GetProfileProps, { dispatch }) => {
    const profile = await getProfileService({
      userToken: userToken,
      userId: userId,
    });
    dispatch(getProfileSlice(profile));
  },
);

export const followProfileThunk = createAsyncThunk(
  "profile/followProfile",
  async ({ userToken, userId }: GetProfileProps) => {
    const result = await followProfileService({
      userToken: userToken,
      userId: userId,
    });
    return result;
  },
);

export const unfollowProfileThunk = createAsyncThunk(
  "profile/unfollowProfile",
  async ({ userToken, userId }: GetProfileProps) => {
    const result = await unfollowProfileService({
      userToken: userToken,
      userId: userId,
    });
    return result;
  },
);
