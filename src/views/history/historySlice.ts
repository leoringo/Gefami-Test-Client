import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosGetHistories } from "../../api/historyService";

import type { IGetHistoryResponse } from "../../api/historyService/responseModel";
import type { AxiosError } from "axios";
import type { GeneralResponseMessage } from "../../api/generalResponse";
import type { RootState } from "../../store/store";

interface HistoryInterface {
  historyList: IGetHistoryResponse[] | [];
}

const initialState: HistoryInterface = {
  historyList: [],
};

export const executeGetHistories = createAsyncThunk<IGetHistoryResponse[], null>(
  "history/getList",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosGetHistories();

      return response.data;
    } catch (err) {
      const error = err as AxiosError<GeneralResponseMessage>;
      return rejectWithValue({
        message: error.response?.data?.message || "Unknown Error",
        status: error.response?.status || 500,
      });
    }
  }
);

const history = createSlice({
  name: "history",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(executeGetHistories.rejected, (state) => {
        state.historyList = [];
      })
      .addCase(executeGetHistories.fulfilled, (state, action) => {
        state.historyList = action.payload;
      });
  },
});

// -- Action
export const {} = history.actions;

export const selectHistoryState = (state: RootState) => state.history;
export default history.reducer;
