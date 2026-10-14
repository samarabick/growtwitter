import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  newAccount,
  type CreateNewAccount,
  type LoginProps,
} from "../user/userService";
import { login as loginService } from "../user/userService";
import { getUser, getUserProfile } from "./userSlice";
import { getProfile as getProfileService } from "./../profile/profileService";
import type { GetProfileProps } from "../profile/profileService";
import axios from "axios";

export const loadLogin = createAsyncThunk(
  "login/loadLogin",
  async ({ username, password }: LoginProps, { dispatch, rejectWithValue }) => {
    try {
      const user = await loginService({
        username: username,
        password: password,
      });
      dispatch(
        getUser({
          username: user.authUser.username,
          id: user.authUser.id,
          token: user.authToken,
          image: user.authUser.imageUrl,
        }),
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return rejectWithValue("Usuário ou senha inválidos");
        }

        if (error.response?.status === 401) {
          return rejectWithValue("Usuário ou senha inválidos");
        }
      }
      return rejectWithValue(
        "Não foi possível realizar o login. Tente novamente.",
      );
    }
  },
);

export const loadProfileUserLoggedThunk = createAsyncThunk(
  "profileUserLogged/loadProfileUserLogged",
  async ({ userToken, userId }: GetProfileProps, { dispatch }) => {
    const userLoggedProfile = await getProfileService({
      userToken: userToken,
      userId: userId,
    });
    dispatch(getUserProfile(userLoggedProfile));
  },
);

export const createNewAccount = createAsyncThunk(
  "createNewAccount",
  async (
    { name, username, password, imageUrl }: CreateNewAccount,
    { rejectWithValue },
  ) => {
    try {
      const creating = await newAccount({
        name: name,
        username: username,
        password: password,
        imageUrl: imageUrl,
      });
      return creating;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          return rejectWithValue("Verifique os campos digitados");
        }

        if (error.response?.status === 409) {
          return rejectWithValue("Nome de usuário já está em uso");
        }
      }
      return rejectWithValue(
        "Não foi possível criar a conta. Tente novamente.",
      );
    }
  },
);
