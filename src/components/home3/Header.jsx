import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

function Header({ state, dispatch }) {
  const headerRef = useRef(null);
  const currentRoute = useRouter().pathname;
  const toggleMenu = (menu) => {
    dispatch({ type: "TOGGLE_MENU", menu });
  };
  const handleRightSidebarToggle = () =>
    dispatch({ type: "TOGGLE_RIGHT_SIDEBAR" });
  const handleLeftSidebarToggle = () =>
    dispatch({ type: "TOGGLE_LEFT_SIDEBAR" });
  const handelSearchModal = () => dispatch({ type: "TOGGLE_SEARCH_MODAL" });
  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "SET_SCROllY", payload: scrollY });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div className={`mobile-search ${state.isModal ? "slide" : ""}`}>
        <div className="container">
          <div className="row d-flex justify-content-center gy-4">
            <div className="col-10">
              <label>What are you looking for?</label>
              <input type="text" placeholder="Search Blog, Magazin" />
            </div>
            <div className="col-2 d-flex justify-content-end align-items-sm-center align-items-end gap-2">
              <div className="search-cross-btn">
                <i className="bi bi-search" />
              </div>
              <div className="search-cross-btn" onClick={handelSearchModal}>
                <i className="bi bi-x-lg" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <header
        ref={headerRef}
        className={`header-area style-3 ${state.scrollY > 10 ? "sticky" : ""}`}
      >
        <div className="header-wrap">
          <div className="header-logo">
            <Link legacyBehavior href="/">
              <a>
                <img
                  alt="image"
                  className="img-fluid"
                  src="assets/images/logo/logo-5.svg"
                />
              </a>
            </Link>
          </div>
          <div
            className={`main-nav ${state.isleftSidebarOpen ? "show-menu" : ""}`}
          >
            <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
              <div className="mobile-logo-wrap">
                <Link legacyBehavior href="/">
                  <a>
                    <img
                      alt="image"
                      className="img-fluid"
                      src="assets/images/logo/logo-5.svg"
                    />
                  </a>
                </Link>
              </div>
              <div className="menu-close-btn" onClick={handleLeftSidebarToggle}>
                <i className="bi bi-x-lg text-dark" />
              </div>
            </div>
            <ul className="menu-list">
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/topic">
                  <a>Topic</a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/feature">
                  <a>Blog</a>
                </Link>
                <i
                  className={`bi bi-chevron-${
                    state.activeMenu === "blog" ? "up" : "down"
                  } dropdown-icon ${
                    state.activeMenu === "blog" ? "active" : ""
                  }`}
                  onClick={() => toggleMenu("blog")}
                />
                <ul
                  className={`sub-menu ${
                    state.activeMenu === "blog" ? "d-block" : ""
                  }`}
                >
                  <li>
                    <Link legacyBehavior href="/blog-classic">
                      <a>Blog Classic</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-standard">
                      <a>Blog Standard</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/wide-thumb-blog">
                      <a>Blog Wide Thumb</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-masonary">
                      <a>Masonary Blog</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-audio">
                      <a>Post Audio</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-gallery">
                      <a>Post Gallery</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/blog-quote">
                      <a>Post Qoute</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/video-blog">
                      <a>Post Video</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/horizontal-scrolling-blog">
                      <a>Horizontal Blog</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <a href="#" className="drop-down">
                  Pages
                </a>
                <i
                  className={`bi bi-chevron-${
                    state.activeMenu === "blog" ? "up" : "down"
                  } dropdown-icon ${
                    state.activeMenu === "blog" ? "active" : ""
                  }`}
                  onClick={() => toggleMenu("blog")}
                />
                <ul
                  className={`sub-menu ${
                    state.activeMenu === "blog" ? "d-block" : ""
                  }`}
                >
                  <li>
                    <Link legacyBehavior href="/author">
                      <a>Author</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/author-details">
                      <a>Author Details</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <Link legacyBehavior href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
