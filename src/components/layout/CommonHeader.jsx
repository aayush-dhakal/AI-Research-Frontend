import Image from "next/image";
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
      <header
        ref={headerRef}
        className={`header-area style-1 sibling-2 ${
          state.scrollY > 10 ? "sticky" : ""
        }`}
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="sidebar-button  mobile-menu-btn d-lg-flex d-none">
            <Link legacyBehavior href="/">
              <a>
                <Image
                  src="/assets/images/company-logo/white-logo.png"
                  alt="image"
                  width={135}
                  height={30}
                />
              </a>
            </Link>
          </div>

          <div className="header-resp-logo d-lg-none d-flex">
            <Link legacyBehavior href="/">
              <a>
                <Image
                  src="/assets/images/company-logo/white-logo.png"
                  alt="image"
                  width={135}
                  height={30}
                />
              </a>
            </Link>
          </div>

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
                  <a className={curerntRoute === "/" ? "active" : ""}>Home</a>
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
                <Link legacyBehavior href="/blog">
                  <a className={curerntRoute === "/blog" ? "active" : ""}>
                    Blog
                  </a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/team">
                  <a className={curerntRoute === "/team" ? "active" : ""}>
                    Team
                  </a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="/about">
                  <a className={curerntRoute === "/about" ? "active" : ""}>
                    About
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
              <li>
                <Link legacyBehavior href="/contact">
                  <a
                    href="https://www.buymeacoffee.com/airesearchforgood?fbclid=IwAR2_t5Zs7UJMSAX6uGFiMh---5QrcyONp7GfrP3jNaaBZLlvCqev5_eHmaU"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Donate
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
