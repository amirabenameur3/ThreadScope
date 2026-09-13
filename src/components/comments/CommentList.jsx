import { buildCommentTree } from "../../utils/buildCommentTree";
import CommentThread from "./CommentThread";

import "./CommentList.css";

function CommentList({ comments }) {
  const commentTree = buildCommentTree(comments);

  return <CommentThread comments={commentTree} />;
}

export default CommentList;