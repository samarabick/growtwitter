import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import userSlice from "./user/userSlice";
import tweetSlice from "./tweet/tweetSlice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/es/storage";
import persistStore from "redux-persist/es/persistStore";
import profileSlice from "./profile/profileSlice";

const rootReducer = combineReducers({
  user: userSlice,
  feed: tweetSlice,
  profile: profileSlice,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

type RootState = ReturnType<typeof store.getState>;

type Dispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<Dispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
