import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchPosts,
  selectPosts,
  selectPostsError,
  selectPostsStatus,
} from "./features/posts/postsSlice";

import "./App.css";

function App() {
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
    <main>
      <h1>ThreadScope</h1>

      <p>Request status: {status}</p>
      <p>Posts received: {posts.length}</p>

      {status === "loading" && <p>Loading live posts...</p>}

      {status === "failed" && (
        <p role="alert">Error: {error}</p>
      )}

      {status === "succeeded" && (
        <ul>
          {posts.slice(0, 10).map((post) => (
            <li key={post.id}>
              <h2>{post.title}</h2>

              <p>
                Posted by {post.author} in {post.communityTitle}
              </p>

              <p>
                Score: {post.score} · Comments: {post.numComments}
              </p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;