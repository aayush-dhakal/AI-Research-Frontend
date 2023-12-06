import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { formattedDate } from "@/utils/helpers";
import api from "../../utils/api";

function CommonFooter() {
  const [recentPosts, setRecentPosts] = useState([]);

  const recentPostSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };
  const paginationPage = 1;
  const paginationLimit = 2;

  const getRecentPosts = async () => {
    try {
      const res = await api.get(
        `/post?sort=${recentPostSort.sortBy},${recentPostSort.sortOrder}&page=${paginationPage}&limit=${paginationLimit}`
      );
      setRecentPosts(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRecentPosts();
  }, []);

  return (
    <footer className="style-1">
      <div className="container">
        <div className="row justify-content-start align-items-start pt-90 pb-90 gy-5">
          <div className="col-xl-3 col-lg-3 col-md-6">
            <div className="footer-info">
              <Link legacyBehavior href="/">
                <a className="footer-logo">
                  <Image
                    src="/assets/images/company-logo/white-logo.png"
                    alt="image"
                    width={180}
                    height={40}
                  />
                </a>
              </Link>
              <h3>We Would Love to Hear From You.</h3>
            </div>
            <div className="footer-form">
              <p>Any question for us?</p>
              <form>
                <div className="form-inner">
                  <Link href="/contact">
                    <button type="text">Send Us an Email</button>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-xl-4 col-lg-5 col-md-6">
            <h4 className="footer-title">Top Article This Week</h4>
            {recentPosts?.map((post, index) => (
              <div
                className={`blog-list-1 ${index === 0 && "mb-25"}`}
                key={post._id}
              >
                <Link legacyBehavior href={`/blog/${post._id}`}>
                  <a className="image">
                    <Image
                      src={post.coverImage}
                      alt="image"
                      width={110}
                      height={75}
                    />
                  </a>
                </Link>
                <div className="content">
                  <h6>
                    <Link legacyBehavior href={`/blog/${post._id}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h6>
                  <ul>
                    <li>
                      <Link legacyBehavior href={`/blog/${post._id}`}>
                        <a>{formattedDate(post.createdAt)}</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <div className="col-xl-3 col-lg-2 col-md-6 col-sm-6 col-6">
            <h4 className="footer-title">Quick Link</h4>
            <ul className="footer-list">
              <li>
                <Link legacyBehavior href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/topic">
                  <a>Topic</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/blog">
                  <a>Blog</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/team">
                  <a>Team</a>
                </Link>
              </li>
              <li>
                <Link legacyBehavior href="/contact">
                  <a>Contact</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-xl-2 col-lg-2 col-md-6 col-sm-6 col-6">
            <h4 className="footer-title">Social Media</h4>
            <ul className="social-2">
              <li>
                <a
                  href="https://twitter.com/airesearch4good"
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="icon">
                    <i className="bx bxl-twitter" />
                    <span>T</span>
                  </div>
                  <p>Twitter</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/ai-research-for-good"
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="icon">
                    <i className="bx bxl-linkedin" />
                    <span>L</span>
                  </div>
                  <p>LinkedIn</p>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/airesearchforgood"
                  rel="noreferrer"
                  target="_blank"
                >
                  <div className="icon">
                    <i className="bx bxl-instagram" />
                    <span>I</span>
                  </div>
                  <p>Instagram</p>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row copyright-area">
          <div className="col-lg-12 text-center">
            <p>© 2023 AI Research For Good</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default CommonFooter;
