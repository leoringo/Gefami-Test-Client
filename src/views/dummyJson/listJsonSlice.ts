import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store/store";
import {
  type IAddJsonDataResponse,
  type IDeleteJsonDataResponse,
  type IGetJsonDataResponse,
} from "../../api/listJsonService/responseModel";
import {
  axiosCreateJson,
  axiosDeleteJson,
  axiosGetJsonList,
} from "../../api/listJsonService";
import type { AxiosError } from "axios";
import type { GeneralResponseMessage } from "../../api/generalResponse";
import type {
  IAddJsonRequest,
  IDeleteJsonRequest,
} from "../../api/listJsonService/requestModel";

interface LoadingInterface {
  listJsonData: IGetJsonDataResponse[];
  isDeleteSuccess: boolean;
  status: "failed" | "idle" | "success";
  message: string;
}

const initialState: LoadingInterface = {
  listJsonData: [],
  status: "idle",
  isDeleteSuccess: false,
  message: "",
};

// Async-thunk
export const getAllJsonData = createAsyncThunk<IGetJsonDataResponse[], null>(
  "listJsonData/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosGetJsonList();
      return response.data;
    } catch (err) {
      const error = err as AxiosError<GeneralResponseMessage>;
      return rejectWithValue({
        message: error.response?.data?.message || "Unknown Error!",
        status: error.response?.status || 500,
      });
    }
  }
);

export const addJsonData = createAsyncThunk<
  IAddJsonDataResponse,
  IAddJsonRequest
>("listJsonData/add", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosCreateJson(payload);

    dispatch(getAllJsonData(null));

    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data?.message || "Unknown Error",
      status: error.response?.status || 500,
    });
  }
});

export const deleteJsonData = createAsyncThunk<
  IDeleteJsonDataResponse,
  IDeleteJsonRequest
>("listJson/delete", async (payload, { rejectWithValue, dispatch }) => {
  try {
    const response = await axiosDeleteJson(payload);

    dispatch(getAllJsonData(null));

    return response.data;
  } catch (err) {
    const error = err as AxiosError<GeneralResponseMessage>;
    return rejectWithValue({
      message: error.response?.data?.message || "Unknown Error",
      status: error.response?.status || 500,
    });
  }
});

const listJsonData = createSlice({
  name: "listJsonData",
  initialState,
  reducers: {
    closePopUpSuccessDelete: (state) => {
      state.isDeleteSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllJsonData.pending, (state) => {
        state.status = "idle";
      })
      .addCase(getAllJsonData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(getAllJsonData.fulfilled, (state, action) => {
        state.status = "success";
        state.listJsonData = action.payload;
      });
    builder
      .addCase(addJsonData.pending, (state) => {
        state.status = "idle";
      })
      .addCase(addJsonData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(addJsonData.fulfilled, (state) => {
        state.status = "success";
      });
    builder
      .addCase(deleteJsonData.pending, (state) => {
        state.status = "idle";
      })
      .addCase(deleteJsonData.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(deleteJsonData.fulfilled, (state, action) => {
        state.isDeleteSuccess = true;
        state.message = action.payload.message;
      });
  },
});

export const { closePopUpSuccessDelete } = listJsonData.actions;
export const selectListJsonDataState = (state: RootState) => state.listJsonData;
export default listJsonData.reducer;
