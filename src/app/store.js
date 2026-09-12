import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/posts/postsSlice";
import postDetailsReducer from "../features/posts/postDetailsSlice";
import commentsReducer from "../features/comments/commentsSlice";

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        postDetails: postDetailsReducer,
        comments: commentsReducer,
    },
});

