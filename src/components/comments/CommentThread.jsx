import CommentCard from "./CommentCard";

function CommentThread({ comments, isNested = false }) {
    return (
        <ul
          className={
            isNested ? "comment-thread comment-thread--nested" : "comment-thread"
          }
        >
            {comments.map((comment) => (
                <li key={comment.id}>
                    <CommentCard comment={comment} />

                    {comment.replies.length > 0 && (
                        <CommentThread comments={comment.replies} isNested />
                    )}
                </li>
            ))}
        </ul>
    );
}

export default CommentThread;