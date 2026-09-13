const LEMMY_BASE_URL = "https://lemmy.world/api/v3";
const POSTS_PER_PAGE = 20;

// Convert Lemmy's nested data into the structure our components use.
function normalizePost({ post, creator, community, counts }) {
  return {
    id: post.id,
    title: post.name,
    body: post.body ?? "",
    url: post.url ?? null,
    thumbnail: post.thumbnail_url ?? null,
    published: post.published,

    author: creator.name,

    community: community.name,
    communityTitle: community.title,
    communityIcon: community.icon ?? null,

    score: counts.score,
    upvotes: counts.upvotes,
    downvotes: counts.downvotes,
    numComments: counts.comments,
  };
}

// Fetch a page of popular posts.
export async function getPopularPosts(page = 1) {
  const parameters = new URLSearchParams({
    sort: "Hot",
    page: page.toString(),
    limit: POSTS_PER_PAGE.toString(),
  });

  const response = await fetch(
    `${LEMMY_BASE_URL}/post/list?${parameters}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Lemmy posts.");
  }

  const lemmyResponse = await response.json();

  const posts = lemmyResponse.posts.map(normalizePost);

  return {
    posts,
    nextPage: posts.length === POSTS_PER_PAGE ? page + 1 : null,
  };
}

// Fetch one post using its ID.
export async function getPostById(postId) {
  const parameters = new URLSearchParams({
    id: String(postId),
  });

  const response = await fetch(
    `${LEMMY_BASE_URL}/post?${parameters}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch this post.");
  }

  const lemmyResponse = await response.json();

  return normalizePost(lemmyResponse.post_view);
}

function getParentId(path) {
  const pathParts = path.split(".").filter(Boolean);

  if (pathParts.length <= 2) {
    return null;
  }

  return Number(pathParts.at(-2));
}

export async function getCommentsByPostId(postId) {
  const parameters = new URLSearchParams({
    post_id: String(postId),
    sort: "Hot",
    max_depth: "8",
  });

  const response = await fetch(
    `${LEMMY_BASE_URL}/comment/list?${parameters}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments.");
  }

  const lemmyResponse = await response.json();

  return lemmyResponse.comments.map(({ comment, creator, counts }) => ({
    id: comment.id,
    content: comment.content,
    published: comment.published,

    author: creator.name,
    avatar: creator.avatar ?? null,

    score: counts.score,
    upvotes: counts.upvotes,
    downvotes: counts.downvotes,

    parentId: getParentId(comment.path),
  }));
}