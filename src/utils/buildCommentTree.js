export function buildCommentTree(comments) {
    const commentsById = new Map();

    comments.forEach((comment) => {
        commentsById.set(comment.id, {
            ...comment,
            replies: [],
        });
    });

    const rootComments = [];

    commentsById.forEach((comment) => {
        const parentComment = commentsById.get(comment.parentId);

        if (parentComment) {
            parentComment.replies.push(comment);
        } else {
            rootComments.push(comment);
        }
    });

    return rootComments;
}