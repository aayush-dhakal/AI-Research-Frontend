import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef } from "react";

function CommonHeader({ state, dispatch }) {
  const headerRef = useRef(null);
  const curerntRoute = useRouter().pathname;
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
        className={`header-area style-1 sibling-2 ${
          state.scrollY > 10 ? "sticky" : ""
        }`}
      >
        <div className="container d-flex justify-content-end align-items-center">
          <div
            className={`main-nav ${state.isleftSidebarOpen ? "show-menu" : ""}`}
          >
            <div className="mobile-logo-area d-lg-none d-flex justify-content-end align-items-center">
              <div className="menu-close-btn" onClick={handleLeftSidebarToggle}>
                <i className="bi bi-x-lg text-dark" />
              </div>
            </div>
            <ul className="menu-list">
              <li
                className="menu-item-has-children"
                style={{ paddingLeft: "0" }}
              >
                <Link legacyBehavior href="/" className="active">
                  <a>Home</a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/about">
                  <a className={curerntRoute === "/about" ? "active" : ""}>
                    About
                  </a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/topic">
                  <a className={curerntRoute === "/topic" ? "active" : ""}>
                    Topic
                  </a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/blog-classic">
                  <a
                    className={curerntRoute === "/blog-classic" ? "active" : ""}
                  >
                    Blog
                  </a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/author">
                  <a className={curerntRoute === "/author" ? "active" : ""}>
                    Author
                  </a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/contact">
                  <a className={curerntRoute === "/contact" ? "active" : ""}>
                    Contact
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          <div className="header-icons d-flex flex-row">
            <div
              className="mobile-menu-btn d-lg-none d-block"
              onClick={handleLeftSidebarToggle}
            >
              <i className="bi bi-list text-dark" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default CommonHeader;
