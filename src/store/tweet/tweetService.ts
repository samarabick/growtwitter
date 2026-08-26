import axios from "axios";
// import { type Tweet } from "../../types";

export interface TweetProps {
  tweetId: string;
  userToken: string;
}

export async function likeTweet({ tweetId, userToken }: TweetProps) {
  try {
    const result = await axios.post(
      "https://growtwitter-api-dny6.onrender.com/likes",
      {
        tweetId: tweetId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function unlikeTweet({ tweetId, userToken }: TweetProps) {
  try {
    const result = await axios.delete(
      "https://growtwitter-api-dny6.onrender.com/likes",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        data: {
          tweetId: tweetId,
        },
      },
    );
    return result.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteTweet({ tweetId, userToken }: TweetProps) {
  try {
    await axios.delete(
      `https://growtwitter-api-dny6.onrender.com/tweets/${tweetId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  } catch {
    alert("erro");
  }
}

export interface CreateTweetProps {
  contentTweet: string;
  userToken: string;
}

export async function createTweet({
  contentTweet,
  userToken,
}: CreateTweetProps) {
  try {
    await axios.post(
      "https://growtwitter-api-dny6.onrender.com/tweets",
      {
        content: contentTweet,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  } catch {
    alert("erro");
  }
}

export interface ReplyTweetProps {
  content: string;
  tweetId: string;
  userToken: string;
}

export async function replyTweet({
  content,
  tweetId,
  userToken,
}: ReplyTweetProps) {
  try {
    await axios.post(
      "https://growtwitter-api-dny6.onrender.com/replies",
      {
        content: content,
        replyTo: tweetId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
}

export interface FetchProps {
  route: string;
  userToken: string;
}

export async function getFollowingFeed(userToken: string) {
  try {
    const result = await axios.get(
      "https://growtwitter-api-dny6.onrender.com/feed",
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
}

export interface getProfileFeedProps {
  userToken: string;
  userId: string;
}

export async function getProfileFeed({
  userToken,
  userId,
}: getProfileFeedProps) {
  try {
    const result = await axios.get(
      `https://growtwitter-api-dny6.onrender.com/users/${userId}/tweets`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
}
