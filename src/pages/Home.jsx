import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Home.css";

import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "../features/posts/postsSlice";

import PostList from "../components/posts/PostList";

function Home() {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  const status = useSelector(selectPostsStatus);
  const error = useSelector(selectPostsError);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [dispatch, status]);

  return (
    <main className="home">
      <header className="home__header">
        <h1>Popular posts</h1>
        <p>Explore discussions from across Lemmy communities.</p>
      </header>

      {(status === "idle" || status === "loading") && (
        <p className="feed-state" role="status">
          Loading posts...
        </p>
      )}

      {status === "failed" && (
        <div className="feed-state feed-state--error" role="alert">
          <p>{error || "Something went wrong while loading posts."}</p>

          <button type="button" onClick={() => dispatch(fetchPosts())}>
            Try again
          </button>
        </div>
      )}

      {status === "succeeded" && posts.length === 0 && (
        <p className="feed-state" role="status">
          No posts found.
        </p>
      )}

      {status === "succeeded" && posts.length > 0 && (
        <PostList posts={posts} />
      )}
    </main>
  );
}

export default Home;