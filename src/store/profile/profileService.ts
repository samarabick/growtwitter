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
