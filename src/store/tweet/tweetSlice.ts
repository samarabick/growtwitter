import { createSlice } from "@reduxjs/toolkit";
import { type Tweet } from "../../types";
// import { likeTweetThunk } from "./tweetThunks";

type TweetState = {
  tweets: Tweet[];
};

const initialState: TweetState = {
  tweets: [],
};

const tweetSlice = createSlice({
  name: "tweetFeedSlice",
  initialState,
  reducers: {
    getFeed: (state, action) => {
      state.tweets = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(likeTweetThunk.fulfilled, (state, action) => {
  //     const tweetId = action.meta.arg.tweetId;

  //     const tweet = state.tweets.find((tweet) => tweet.id === tweetId);

  //   });
  // },
});

export const { getFeed } = tweetSlice.actions;

export default tweetSlice.reducer;
