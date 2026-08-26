import axios from "axios";

export interface LoginProps {
  username: string;
  password: string;
}

export async function login({ username, password }: LoginProps) {
  try {
    const result = await axios.post(
      `https://growtwitter-api-dny6.onrender.com/auth/login`,
      { username: username, password: password },
    );
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
}
