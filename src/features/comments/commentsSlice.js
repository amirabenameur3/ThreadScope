import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCommentsByPostId } from "../../services/lemmyApi";

const initialState = {
    items: [],
    status: "idle",
    error: null,
    currentPostId: null,
};

export const fetchCommentsByPostId = createAsyncThunk(
    "comments/fetchCommentsByPostId",
    async (postId) => {
        return getCommentsByPostId(postId);
    }
);

const commentsSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(fetchCommentsByPostId.pending, (state, action) => {
            state.status = "loading";
            state.error = null;
            state.items = [];
            state.currentPostId = String(action.meta.arg);
          })

          .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
          })

          .addCase(fetchCommentsByPostId.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
          });
    },
});

export const selectComments = (state) => state.comments.items;

export const selectCommentsStatus = (state) => state.comments.status;

export const selectCommentsError = (state) => state.comments.error;

export const selectCommentsPostId = (state) => state.comments.currentPostId;

export default commentsSlice.reducer;

