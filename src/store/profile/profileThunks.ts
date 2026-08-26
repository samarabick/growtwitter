import { createAsyncThunk } from "@reduxjs/toolkit";
import { type GetProfileProps } from "./profileService";
import { getProfile as getProfileService } from "./profileService";
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
