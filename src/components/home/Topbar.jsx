import React from "react";

function Topbar() {
  return (
    <div className="topbar-2 d-lg-flex d-none">
      <div className="container d-flex justify-content-between align-items-center">
        <div className="left-social">
          <ul>
            <li>
              <a href="#">
                <i className="bx bxl-facebook" />
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com/VancityReynolds"
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
    </div>
  );
}

export default Topbar;
