import { configureStore } from "@reduxjs/toolkit";
import type { Action, ThunkAction } from "@reduxjs/toolkit";

import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";

import loginReducer from "../views/login/loginSlice";
import globalLoadingReducer from "../views/loading/loadingSlice";
import globalErrorReducer from "../views/globalError/globalErrorSlice";
import profileReducer from "../views/profile/profileSlice";
import historyReducer from "../views/history/historySlice";
import listJsonDataReducer from "../views/dummyJson/listJsonSlice"

const reducer = {
  login: loginReducer,
  globalLoading: globalLoadingReducer,
  globalError: globalErrorReducer,
  profile: profileReducer,
  history: historyReducer,
  listJsonData: listJsonDataReducer
};

export const store = configureStore({ reducer });

// For TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
