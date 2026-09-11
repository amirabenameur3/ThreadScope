import PostCard from "./PostCard";
import "./PostList.css";

function PostList({ posts }) {
  return (
    <ul className="post-list">
      {posts.map((post) => (
        <li key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  );
}

export default PostList;