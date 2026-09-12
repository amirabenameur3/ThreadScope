import CommentCard from "./CommentCard";

function CommentList({ comments }) {
  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id}>
          <CommentCard comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;