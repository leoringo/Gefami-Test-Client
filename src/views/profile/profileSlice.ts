import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import type { IEditProfileResponse } from "../../api/profileService/responseModel";
import type { IEditProfileRequest } from "../../api/profileService/requestModel";
import type { GeneralResponseMessage } from "../../api/generalResponse";
import type { AxiosError } from "axios";

import { axiosEditProfile } from "../../api/profileService";

interface ProfileInterface {
  status: "failed" | "idle" | "success";
  message: string;
}

const initialState: ProfileInterface = {
  status: "idle",
  message: "",
};

export const executeEditProfile = createAsyncThunk<
  IEditProfileResponse,
  IEditProfileRequest
>("profile/executeEdit", async (payload, { rejectWithValue }) => {
  try {
    const response = await axiosEditProfile(payload);

    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data?.message || "Unknown Error",
      status: error.response?.status || 500,
    });
  }
});

const profile = createSlice({
  name: "profile",
  initialState,
  reducers: {
    closePopUpSuccessEdit: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(executeEditProfile.rejected, (state, action) => {
        state.status = "failed";
        state.message = (action.payload as GeneralResponseMessage).message;
      })
      .addCase(executeEditProfile.pending, (state) => {
        state.status = "idle";
      })
      .addCase(executeEditProfile.fulfilled, (state, action) => {
        state.status = "success";
        state.message = action.payload.message;
      });
  },
});

// -- Action
export const { closePopUpSuccessEdit } = profile.actions;

export const selectProfileState = (state: RootState) => state.profile;
export default profile.reducer;
