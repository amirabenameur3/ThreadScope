import { createAsyncThunk ,createSlice } from "@reduxjs/toolkit";
import { getPopularPosts } from "../../services/redditApi";


const initialState = {
    items: [],
    status: "idle",
    error: null,
    after: null,
};

export const fetchPosts = createAsyncThunk(
    "posts/fetchPosts",
    async () => {
        return await getPopularPosts();
    }
);

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (Builder) => {
        Builder
        .addCase(fetchPosts.pending, (state) => {
            state.status = "loading";
            state.error = null;
        })

        .addCase(fetchPosts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload.posts;
            state.after = action.payload.after;
        })

        .addCase(fetchPosts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
    },
});

export const selectPosts = (state) => state.posts.items;
export const selectPostsStatus = (state) => state.posts.status;
export const selectPostsError = (state) => state.posts.error;
export const selectPostsAfter = (state) => state.posts.after;

export default postsSlice.reducer;

