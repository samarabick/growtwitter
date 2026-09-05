import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  deleteTweet as deleteTweetService,
  createTweet as createTweetService,
  getFollowingFeed as getFollowingFeedService,
  getProfileFeed as getProfileFeedService,
  likeTweet as likeTweetService,
  unlikeTweet as unlikeTweetService,
  replyTweet as replyTweetService,
} from "./tweetService";
import { type getProfileFeedProps } from "./tweetService";
import { type ReplyTweetProps } from "./tweetService";
import toast from "react-hot-toast";
import { getHomeFeed as getHomeFeedSlice } from "./tweetSlice";
import { getProfileFeed as getProfileFeedSlice } from "./tweetSlice";

export const fetchFollowingFeedThunk = createAsyncThunk(
  "tweet/fetchTweetsFeed",
  async (userToken: string, { dispatch }) => {
    const tweets = await getFollowingFeedService(userToken);

    dispatch(getHomeFeedSlice(tweets));
  },
);

export const fetchProfileFeedThunk = createAsyncThunk(
  "tweet/fetchTweetsProfile",
  async ({ userToken, userId }: getProfileFeedProps, { dispatch }) => {
    const tweets = await getProfileFeedService({
      userToken: userToken,
      userId: userId,
    });
    dispatch(getProfileFeedSlice(tweets));
  },
);

interface DeleteTweetThunkProps {
  tweetId: string;
  userToken: string;
  userId: string;
}

export const deleteTweetThunk = createAsyncThunk(
  "tweet/deleteTweet",
  async (
    { tweetId, userToken, userId }: DeleteTweetThunkProps,
    { dispatch },
  ) => {
    await deleteTweetService({
      tweetId,
      userToken,
    });

    await dispatch(
      fetchProfileFeedThunk({ userToken: userToken, userId: userId }),
    );

    await dispatch(fetchFollowingFeedThunk(userToken));

    toast.success("Tweet excluído!");
  },
);

interface CreateTweetThunkProps {
  contentTweet: string;
  userToken: string;
  userId: string;
}

export const createTweetThunk = createAsyncThunk(
  "tweet/createTweet",
  async (
    { contentTweet, userToken, userId }: CreateTweetThunkProps,
    { dispatch },
  ) => {
    await createTweetService({
      contentTweet: contentTweet,
      userToken: userToken,
    });

    await dispatch(fetchFollowingFeedThunk(userToken));

    await dispatch(
      fetchProfileFeedThunk({ userToken: userToken, userId: userId }),
    );
    toast.success("Tweet postado!");
  },
);

export const replyTweetThunk = createAsyncThunk(
  "tweet/replyTweet",
  async ({ content, tweetId, userToken }: ReplyTweetProps) => {
    await replyTweetService({
      content: content,
      tweetId: tweetId,
      userToken: userToken,
    });
    toast.success("Tweet postado!");
  },
);

interface LikeUnlikeTweetThunkProps {
  tweetId: string;
  userToken: string;
  userId: string;
}

export const likeTweetThunk = createAsyncThunk(
  "tweets/like",
  async ({ tweetId, userToken }: LikeUnlikeTweetThunkProps) => {
    const result = await likeTweetService({
      tweetId: tweetId,
      userToken: userToken,
    });
    return result;
  },
);

export const unlikeTweetThunk = createAsyncThunk(
  "tweets/unlike",
  async ({ tweetId, userToken }: LikeUnlikeTweetThunkProps) => {
    const result = await unlikeTweetService({
      tweetId: tweetId,
      userToken: userToken,
    });
    return result;
  },
);
