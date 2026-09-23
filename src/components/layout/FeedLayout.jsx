import { Outlet, useMatch } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";
import Home from "../../pages/Home";

function FeedLayout() {
  const hasSelectedPost = Boolean(useMatch("/post/:postId"));

  return (
    <div className="app">
      <Header />

      <div className="app__layout">
        <Sidebar />

        <main className="app__main">
          <div
            className={
              hasSelectedPost
                ? "app__content app__content--split"
                : "app__content"
            }
          >
            <section
              className="app__feed-column"
              aria-label="Posts feed"
            >
              <Home />
            </section>

            <section
              className="app__detail-column"
              aria-label="Selected post"
            >
              <Outlet />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default FeedLayout;