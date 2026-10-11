import { createSlice } from "@reduxjs/toolkit";
import { type Tweet } from "../../types";
import {
  deleteTweetThunk,
  fetchFollowingFeedThunk,
  fetchProfileFeedThunk,
} from "./tweetThunks";

type TweetState = {
  home: Tweet[];
  profile: Tweet[];
  isFeedLoading: boolean;
  isDeletingTweet: boolean;
};

const initialState: TweetState = {
  home: [],
  profile: [],
  isFeedLoading: false,
  isDeletingTweet: false,
};

const tweetSlice = createSlice({
  name: "tweetFeedSlice",
  initialState,
  reducers: {
    getHomeFeed: (state, action) => {
      state.home = action.payload;
    },
    getProfileFeed: (state, action) => {
      state.profile = action.payload;
    },
    setHomeLoading: (state, action) => {
      state.isFeedLoading = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchFollowingFeedThunk.pending, (state) => {
        if (!state.isDeletingTweet) {
          state.isFeedLoading = true;
        }
      })
      .addCase(fetchFollowingFeedThunk.fulfilled, (state) => {
        state.isFeedLoading = false;
      })
      .addCase(fetchFollowingFeedThunk.rejected, (state) => {
        state.isFeedLoading = false;
      })
      .addCase(fetchProfileFeedThunk.pending, (state) => {
        if (!state.isDeletingTweet) {
          state.isFeedLoading = true;
        }
      })
      .addCase(fetchProfileFeedThunk.fulfilled, (state) => {
        state.isFeedLoading = false;
      })
      .addCase(fetchProfileFeedThunk.rejected, (state) => {
        state.isFeedLoading = false;
      })
      .addCase(deleteTweetThunk.pending, (state) => {
        if (!state.isFeedLoading) {
          state.isDeletingTweet = true;
        }
      })
      .addCase(deleteTweetThunk.fulfilled, (state) => {
        state.isDeletingTweet = false;
      })
      .addCase(deleteTweetThunk.rejected, (state) => {
        state.isDeletingTweet = false;
      });
  },
});

export const { getHomeFeed } = tweetSlice.actions;
export const { getProfileFeed } = tweetSlice.actions;
export const { setHomeLoading } = tweetSlice.actions;

export default tweetSlice.reducer;
