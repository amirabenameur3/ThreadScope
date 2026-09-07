const REDDIT_BASE_URL = "https://www.reddit.com";

export async function getPopularPosts() {
    const response = await fetch(`${REDDIT_BASE_URL}/r/popular.json`);

    if (!response.ok) {
        throw new Error("Failed to fetch Reddit posts."); 
    }

    const redditResponse = await response.json();

    return {
        posts: redditResponse.data.children.map((post) => post.data),
        after: redditResponse.data.after,
    };
}
