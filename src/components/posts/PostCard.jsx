import { Link } from "react-router-dom";
import "./PostCard.css";

function PostCard({ post }) {
  return (
    <article className="post-card">
      <div className="post-card__score">
        <span className="post-card__score-label">Score</span>
        <strong>{post.score}</strong>
      </div>

      <div className="post-card__content">
        <h2 className="post-card__title">
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h2>

        <p className="post-card__meta">
          By {post.author} · {post.communityTitle}
        </p>

        <p className="post-card__comments">
          {post.numComments}{" "}
          {post.numComments === 1 ? "comment" : "comments"}
        </p>
      </div>

      {post.thumbnail && (
        <img
          className="post-card__thumbnail"
          src={post.thumbnail}
          alt=""
          loading="lazy"
        />
      )}
    </article>
  );
}

export default PostCard;