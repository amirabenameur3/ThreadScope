import "./CommentCard.css";

function CommentCard({ comment }) {
  const publishedDate = new Date(comment.published).toLocaleDateString();

  return (
    <article className="comment-card">
      <div className="comment-card__avatar" aria-hidden="true">
        {comment.author.charAt(0).toUpperCase()}
      </div>

      <div className="comment-card__content">
        <div className="comment-card__meta">
          <span className="comment-card__author">u/{comment.author}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={comment.published}>{publishedDate}</time>
        </div>

        <p className="comment-card__text">{comment.content}</p>

        <p className="comment-card__score">
          Score: {comment.score}
        </p>
      </div>
    </article>
  );
}

export default CommentCard;