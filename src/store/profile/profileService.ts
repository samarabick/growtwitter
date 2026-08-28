import axios from "axios";

export interface GetProfileProps {
  userToken: string;
  userId: string;
}

export async function getProfile({ userToken, userId }: GetProfileProps) {
  try {
    const result = await axios.get(
      `https://growtwitter-api-dny6.onrender.com/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    return result.data.data;
  } catch (error) {
    console.log("loadProfile", error);
  }
}

export async function followProfile({ userToken, userId }: GetProfileProps) {
  try {
    const result = await axios.post(
      "https://growtwitter-api-dny6.onrender.com/followers",
      {
        userId: userId,
      },
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export async function unfollowProfile({ userToken, userId }: GetProfileProps) {
  try {
    const result = await axios.delete(
      "https://growtwitter-api-dny6.onrender.com/followers",
      {
        data: {
          userId: userId,
        },
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      },
    );
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
