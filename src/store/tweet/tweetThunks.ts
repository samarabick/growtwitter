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
import toast from "react-hot-toast";
import { getHomeFeed as getHomeFeedSlice } from "./tweetSlice";
import { getProfileFeed as getProfileFeedSlice } from "./tweetSlice";
import axios from "axios";

interface fetchFollowingFeedThunkProps {
  userToken: string;
  silentRefresh?: boolean;
}

export const fetchFollowingFeedThunk = createAsyncThunk(
  "tweet/fetchTweetsFeed",
  async (
    { userToken }: fetchFollowingFeedThunkProps,
    { dispatch, rejectWithValue },
  ) => {
    try {
      const tweets = await getFollowingFeedService(userToken);

      dispatch(getHomeFeedSlice(tweets));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue("Não foi possível buscar tweets");
      }
    }
  },
);

interface fetchProfileFeedThunkProps {
  userToken: string;
  userId: string;
  silentRefresh?: boolean;
}

export const fetchProfileFeedThunk = createAsyncThunk(
  "tweet/fetchTweetsProfile",
  async ({ userToken, userId }: fetchProfileFeedThunkProps, { dispatch }) => {
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
  type: string;
}

export const deleteTweetThunk = createAsyncThunk(
  "tweet/deleteTweet",
  async (
    { tweetId, userToken, userId, type }: DeleteTweetThunkProps,
    { dispatch },
  ) => {
    await deleteTweetService({
      tweetId,
      userToken,
    });

    if (type === "home") {
      dispatch(
        fetchFollowingFeedThunk({ userToken: userToken, silentRefresh: true }),
      );
    } else {
      dispatch(
        fetchProfileFeedThunk({
          userId: userId,
          userToken: userToken,
          silentRefresh: true,
        }),
      );
    }

    toast.success("Tweet excluído!");
  },
);

interface CreateTweetThunkProps {
  contentTweet: string;
  userToken: string;
  userId: string;
  type: string;
}

export const createTweetThunk = createAsyncThunk(
  "tweet/createTweet",
  async (
    { contentTweet, userToken, userId, type }: CreateTweetThunkProps,
    { dispatch },
  ) => {
    await createTweetService({
      contentTweet: contentTweet,
      userToken: userToken,
    });

    if (type === "/home") {
      dispatch(
        fetchFollowingFeedThunk({ userToken: userToken, silentRefresh: true }),
      );
    } else {
      dispatch(
        fetchProfileFeedThunk({
          userId: userId,
          userToken: userToken,
          silentRefresh: true,
        }),
      );
    }
    toast.success("Tweet postado!");
  },
);

// RESPONDER TWEET
// type: serve para indicar qual feed re-renderizar na chamada da API,
// para atualizar quando houver um novo tweet, like, deslike
interface ReplyTweetThunkProps {
  content: string;
  tweetId: string;
  userToken: string;
  userId: string;
  type?: string;
}

export const replyTweetThunk = createAsyncThunk(
  "tweet/replyTweet",
  async (
    { content, tweetId, userToken, userId, type }: ReplyTweetThunkProps,
    { dispatch },
  ) => {
    await replyTweetService({
      content: content,
      tweetId: tweetId,
      userToken: userToken,
    });
    if (type === "home") {
      dispatch(
        fetchFollowingFeedThunk({ userToken: userToken, silentRefresh: true }),
      );
    } else {
      dispatch(
        fetchProfileFeedThunk({
          userId: userId,
          userToken: userToken,
          silentRefresh: true,
        }),
      );
    }
    toast.success("Tweet postado!");
  },
);

interface LikeUnlikeTweetThunkProps {
  tweetId: string;
  userToken: string;
  userId: string;
  silent?: boolean;
  type?: string;
}

// CURTIR - DESCURTIR

// type: serve para indicar qual feed re-renderizar na chamada da API,
// para atualizar quando houver um novo tweet, like, deslike

export const likeTweetThunk = createAsyncThunk(
  "tweets/like",
  async (
    { tweetId, userToken, type, userId }: LikeUnlikeTweetThunkProps,
    { dispatch },
  ) => {
    const result = await likeTweetService({
      tweetId: tweetId,
      userToken: userToken,
    });
    if (type === "home") {
      dispatch(
        fetchFollowingFeedThunk({ userToken: userToken, silentRefresh: true }),
      );
    } else {
      dispatch(
        fetchProfileFeedThunk({
          userId: userId,
          userToken: userToken,
          silentRefresh: true,
        }),
      );
    }
    return result;
  },
);

export const unlikeTweetThunk = createAsyncThunk(
  "tweets/unlike",
  async (
    { tweetId, userToken, userId, type }: LikeUnlikeTweetThunkProps,
    { dispatch },
  ) => {
    const result = await unlikeTweetService({
      tweetId: tweetId,
      userToken: userToken,
    });
    if (type === "home") {
      dispatch(
        fetchFollowingFeedThunk({ userToken: userToken, silentRefresh: true }),
      );
    } else {
      dispatch(
        fetchProfileFeedThunk({
          userId: userId,
          userToken: userToken,
          silentRefresh: true,
        }),
      );
    }
    return result;
  },
);
