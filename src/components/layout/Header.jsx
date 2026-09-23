import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ThreadScopeLogo from "./ThreadScopeLogo";
import "./Header.css";

function Header() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("threadscope-theme");
    
    if (savedTheme) {
      return savedTheme;
    }
    
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
    
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("threadscope-theme", theme);
  }, [theme]);
  
  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "light" ? "dark" : "light"
    );
  }
  return (
    <header className="app-header">
      <div className="app-header__content">
        <Link to="/" className="app-header__brand">
          <ThreadScopeLogo className="app-header__logo" />

          <span className="app-header__name">ThreadScope</span>
        </Link>

        <form
          className="app-header__search"
          role="search"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="visually-hidden" htmlFor="site-search">
            Search posts
          </label>

          <input
            id="site-search"
            name="search"
            type="search"
            placeholder="Search ThreadScope"
            autoComplete="off"
          />
        </form>

        <button
          className="app-header__theme-button"
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
          title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
        >
          {theme === "light" ? "☾" : "☀"}
        </button>
      </div>
    </header>
  );
}

export default Header;