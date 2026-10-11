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
    throw error;
  }
}

export interface CreateNewAccount {
  name: string;
  username: string;
  password: string;
  imageUrl?: string;
}

export async function newAccount({
  name,
  username,
  password,
  imageUrl,
}: CreateNewAccount) {
  try {
    const result = await axios.post(
      `https://growtwitter-api-dny6.onrender.com/auth/register`,
      {
        name: name,
        username: username,
        password: password,
        imageUrl: imageUrl,
      },
    );
    return result.data.data;
  } catch (error) {
    console.log(error);
  }
}
