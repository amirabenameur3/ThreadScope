const LEMMY_BASE_URL = "https://lemmy.world/api/v3";
const POSTS_PER_PAGE = 20;

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

  const posts = lemmyResponse.posts.map(
    ({ post, creator, community, counts }) => ({
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
    })
  );

  return {
    posts,
    nextPage: posts.length === POSTS_PER_PAGE ? page + 1 : null,
  };
}
