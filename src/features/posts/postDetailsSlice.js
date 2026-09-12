import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPostById } from "../../services/lemmyApi";

const initialState = {
  post: null,
  status: "idle",
  error: null,
  currentRequestId: null,
};

export const fetchPostById = createAsyncThunk(
  "postDetails/fetchPostById",
  async (postId) => {
    return await getPostById(postId);
  }
);

const postDetailsSlice = createSlice({
  name: "postDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostById.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.post = null;
        state.currentRequestId = action.meta.requestId;
      })

      .addCase(fetchPostById.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.status = "succeeded";
        state.post = action.payload;
        state.currentRequestId = null;
      })

      .addCase(fetchPostById.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) {
          return;
        }

        state.status = "failed";
        state.error = action.error.message;
        state.currentRequestId = null;
      });
  },
});

export const selectPostDetails = (state) => state.postDetails.post;

export const selectPostDetailsStatus = (state) =>
  state.postDetails.status;

export const selectPostDetailsError = (state) =>
  state.postDetails.error;

export default postDetailsSlice.reducer;