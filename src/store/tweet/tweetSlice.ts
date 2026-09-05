import { createSlice } from "@reduxjs/toolkit";
import { type Tweet } from "../../types";
// import { likeTweetThunk } from "./tweetThunks";

type TweetState = {
  home: Tweet[];
  profile: Tweet[];
};

const initialState: TweetState = {
  home: [],
  profile: [],
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
  },
  // extraReducers: (builder) => {
  //   builder.addCase(likeTweetThunk.fulfilled, (state, action) => {
  //     const tweetId = action.meta.arg.tweetId;

  //     const tweet = state.tweets.find((tweet) => tweet.id === tweetId);

  //   });
  // },
});

export const { getHomeFeed } = tweetSlice.actions;
export const { getProfileFeed } = tweetSlice.actions;

export default tweetSlice.reducer;
