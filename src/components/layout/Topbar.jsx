import { formattedDate } from "@/utils/helpers";
import Image from "next/image";
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
              <Image
                src="/assets/images/company-logo/black-logo.png"
                alt="image"
                width={170}
                height={34}
              />
            </a>
          </Link>
        </div>

        <ul className="social-1">
          <li>
            <a
              href="https://twitter.com/airesearch4good"
              rel="noreferrer"
              target="_blank"
            >
              <i className="bx bxl-twitter" />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/company/ai-research-for-good"
              rel="noreferrer"
              target="_blank"
            >
              <i className="bx bxl-linkedin" />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/airesearchforgood"
              rel="noreferrer"
              target="_blank"
            >
              <i className="bx bxl-instagram" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Topbar;
