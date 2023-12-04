import { formattedDate } from "@/utils/helpers";
import Link from "next/link";
import React from "react";

const Topbar = () => {
  return (
    <div className="topbar-1 d-lg-flex d-none">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="date">{formattedDate(new Date())}</div>
        <div className="header-logo">
          <Link legacyBehavior href="/">
            <a>
              <img
                alt="image"
                className="img-fluid"
                src="/assets/images/logo/logo-1.svg"
              />
            </a>
          </Link>
        </div>
        <ul className="social-1">
          <li>
            <a href="https://www.facebook.com/">
              <i className="bx bxl-facebook" />
            </a>
          </li>
          <li>
            <a href="https://www.twitter.com/">
              <i className="bx bxl-twitter" />
            </a>
          </li>
          <li>
            <a href="https://www.pinterest.com/">
              <i className="bx bxl-pinterest-alt" />
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com/">
              <i className="bx bxl-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
