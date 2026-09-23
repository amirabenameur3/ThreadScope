import { NavLink } from "react-router-dom";
import "./Sidebar.css";

import "./Sidebar.css";

const communities = [
  { name: "Technology", initials: "TE" },
  { name: "Science", initials: "SC" },
  { name: "Gaming", initials: "GA" },
  { name: "Movies & TV", initials: "MT" },
  { name: "Cats", initials: "CA" },
];

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Community navigation and filters">
      <section className="sidebar__section">
        <h2 className="sidebar__heading">Communities</h2>

        <ul className="sidebar__list">
          {communities.map((community, index) => (
            <li key={community.name}>
              <button
                className={
                  index === 0
                    ? "sidebar__community sidebar__community--active"
                    : "sidebar__community"
                }
                type="button"
              >
                <span
                  className="sidebar__community-icon"
                  aria-hidden="true"
                >
                  {community.initials}
                </span>

                <span>{community.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section className="sidebar__section">
        <h2 className="sidebar__heading">Filters</h2>

        <form
          className="sidebar__search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="sidebar-search">
            Filter posts
          </label>

          <input
            id="sidebar-search"
            name="sidebar-search"
            type="search"
            placeholder="Search posts..."
          />
        </form>
      </section>

      <section className="sidebar__section">
        <label className="sidebar__heading" htmlFor="sort-posts">
          Sort by
        </label>

        <select id="sort-posts" className="sidebar__select" defaultValue="hot">
          <option value="hot">Hot</option>
          <option value="new">New</option>
          <option value="top">Top</option>
        </select>
      </section>
    </aside>
  );
}

export default Sidebar;