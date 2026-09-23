import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import {
  fetchPostById,
  selectPostDetails,
  selectPostDetailsError,
  selectPostDetailsStatus,
} from "../features/posts/postDetailsSlice";

import {
    fetchCommentsByPostId,
    selectComments,
    selectCommentsError,
    selectCommentsPostId,
    selectCommentsStatus,
} from "../features/comments/commentsSlice";

import CommentList from "../components/comments/CommentList";

import "./Post.css";

function Post() {
  const { postId } = useParams();
  const dispatch = useDispatch();

  const post = useSelector(selectPostDetails);
  const postStatus = useSelector(selectPostDetailsStatus);
  const postError = useSelector(selectPostDetailsError);

  const comments = useSelector(selectComments);
  const commentsStatus = useSelector(selectCommentsStatus);
  const commentsError = useSelector(selectCommentsError);
  const commentsPostId = useSelector(selectCommentsPostId);

  useEffect(() => {
    dispatch(fetchPostById(postId));
    dispatch(fetchCommentsByPostId(postId));
  }, [dispatch, postId]);

  // Avoid briefly displaying a previous post when the URL changes.
  const isCurrentPost = post && String(post.id) === postId;
  const commentsBelongToCurrentPost = commentsPostId === postId;

  return (
    <section className="post-page">
      <Link to="/" className="post-page__back">
        ← Back to posts
      </Link>

      {(postStatus === "idle" || postStatus === "loading") && (
        <p role="status">Loading post...</p>
      )}

      {postStatus === "failed" && (
        <div className="post-page__error" role="alert">
          <p>{postError || "Unable to load this post."}</p>

          <button
            type="button"
            onClick={() => dispatch(fetchPostById(postId))}
          >
            Try again
          </button>
        </div>
      )}

      {postStatus === "succeeded" && isCurrentPost && (
        <article className="post-details">
          <header>
            <h1 className="post-details__title">{post.title}</h1>

            <p className="post-details__meta">
              By {post.author} · {post.communityTitle}
            </p>
          </header>

          {post.thumbnail && (
            <img
              className="post-details__image"
              src={post.thumbnail}
              alt=""
            />
          )}

          {post.body && (
            <div className="post-details__body">{post.body}</div>
          )}

          {post.url && /^https?:\/\//i.test(post.url) && (
            <a
              className="post-details__source"
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open original link ↗
            </a>
          )}

          <footer className="post-details__stats">
            <span>Score: {post.score}</span>
            <span>
              {post.numComments}{" "}
              {post.numComments === 1 ? "comment" : "comments"}
            </span>
          </footer>

          <section className="post-comments" aria-labelledby="comments-title">
            <h2 id="comments-title" className="post-comments__title">
                Comments
            </h2>

            {commentsStatus === "loading" && commentsBelongToCurrentPost && (
                <p className="post-comments__state" role="status">
                    Loading comments...
                </p>
            )}

            {commentsStatus === "failed" && commentsBelongToCurrentPost && (
                <div
                  className="post-comments__state post-comments__state--error"
                  role="alert"
                >
                    <p>{commentsError || "Unable to load comments."}</p>

                    <button
                      type="button"
                      onClick={() => dispatch(fetchCommentsByPostId(postId))}
                    >
                        Try again
                    </button>
                </div>
            )}

            {commentsStatus === "succeeded" &&
             commentsBelongToCurrentPost &&
             comments.length === 0 && (
                <p className="post-comments__state">
                    There are no comments yet.
                </p>
            )}

            {commentsStatus === "succeeded" &&
             commentsBelongToCurrentPost &&
             comments.length > 0 && (
                <CommentList comments={comments} />
            )}
          </section>
        </article>
      )}
    </section>
  );
}

export default Post;