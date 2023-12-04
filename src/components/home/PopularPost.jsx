"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PostContext from "@/context/post/PostContext";
import { formattedDate } from "@/utils/helpers";
import api from "../../utils/api";

const PopularPost = () => {
  const { posts, getPosts } = useContext(PostContext);

  const [recentPosts, setRecentPosts] = useState([]);

  const popularStoriesSort = {
    sortBy: "createdAt",
    sortOrder: "asc",
  };
  const paginationPage = 1;
  const paginationLimit = 3;

  const recentPostSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };

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
    // pass sort and limit params in this function as params
    getPosts(popularStoriesSort, paginationPage, paginationLimit);
    getRecentPosts();
  }, []);

  return (
    <section className="popular-post-section mt-5">
      <div className="container">
        <div className="row gy-3 mb-30">
          <div className="col-sm-8">
            <div className="section-title-4 style-3">
              <h3>
                Popular <span>Stories</span>
              </h3>
              <img src="/assets/images/icons/title-arrow.svg" alt="image" />
            </div>
          </div>
          <div className="col-sm-4 d-flex justify-content-sm-end mb-4">
            <Link legacyBehavior href="/blog">
              <a className="eg-btn arrow-btn style-2">
                View Post
                <i className="bi bi-arrow-right" />
              </a>
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-8">
            {posts.map((post) => (
              <div className="blog-list-4 mb-30" key={post._id}>
                <Link legacyBehavior href={`/blog/${post._id}`}>
                  <a className="image">
                    <Image
                      src={post.coverImage}
                      alt="image"
                      width={250}
                      height={189}
                      // style={{ maxHeight: "189px", minWidth: "250px" }}
                    />
                  </a>
                </Link>
                <div className="content">
                  <div className="author">
                    <Image
                      src={post.user.image}
                      alt="image"
                      width={39}
                      height={39}
                    />
                    <div className="desig">
                      <h6>
                        <Link legacyBehavior href="/author-details">
                          <a>{post.user.name}</a>
                        </Link>
                      </h6>
                      <Link legacyBehavior href={`/blog/${post._id}`}>
                        <a className="date">{formattedDate(post.createdAt)}</a>
                      </Link>
                    </div>
                  </div>
                  <h4>
                    <Link legacyBehavior href={`/blog/${post._id}`}>
                      <a>{post.title}</a>
                    </Link>
                  </h4>
                </div>
              </div>
            ))}
          </div>
          <div className="col-lg-4">
            <div className="popular-list-wrapper mb-30">
              <div className="title">
                <svg viewBox="0 0 11 14" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.15888 13.1844C8.73336 10.6029 8.07416 7.35423 5.59136 5.46029C5.58991 5.45922 5.58846 5.45788 5.5873 5.45708L5.59803 5.48172L5.59629 5.5002C6.08003 6.68033 6.01217 7.97589 5.41793 9.08745L4.99915 9.87117L4.87068 9.00522C4.78338 8.41784 4.54354 7.85751 4.17407 7.3778H4.11578L4.08503 7.29744C4.08938 8.19499 3.88464 9.07915 3.48297 9.91322C2.95602 11.0047 3.03345 12.2633 3.69033 13.2806L4.14362 13.9829L3.3281 13.6647C1.98331 13.1399 0.908237 12.1291 0.378384 10.8914C-0.215271 9.50931 -0.105357 7.90679 0.672747 6.6056C1.07847 5.92875 1.36269 5.21012 1.51784 4.46926L1.66952 3.74314L2.0564 4.39079C2.24113 4.69961 2.37715 5.03388 2.46154 5.38503L2.47024 5.39333L2.47923 5.44958L2.48765 5.44717C3.64654 4.02518 4.34083 2.25579 4.44204 0.464176L4.46814 0L4.88982 0.253917C6.61075 1.28967 7.80589 2.95139 8.17508 4.81853L8.18349 4.85684L8.18784 4.86273L8.20669 4.83809C8.54398 4.42668 8.72204 3.93732 8.72204 3.42226V2.62461L9.2432 3.26048C10.4549 4.73845 11.0761 6.57185 10.9926 8.42319C10.8899 10.6024 9.6031 12.5151 7.5501 13.5514L6.66121 14L7.15888 13.1844Z"></path>
                </svg>
                <h6>Don’t Miss</h6>
              </div>

              {recentPosts.map((recentPost) => (
                <div className="blog-list-1 style-five" key={recentPost._id}>
                  <Link legacyBehavior href="/blog">
                    <a className="image">
                      <Image
                        src={recentPost.coverImage}
                        alt="image"
                        width={103}
                        height={97}
                      />
                    </a>
                  </Link>
                  <div className="content">
                    <h6>
                      <Link legacyBehavior href="/blog">
                        <a>{recentPost.title}</a>
                      </Link>
                    </h6>
                    <ul>
                      <li>
                        <Link legacyBehavior href="/blog-standard">
                          <a>{formattedDate(recentPost.createdAt)}</a>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
              <div className="list-footer">
                <Link legacyBehavior href="/blog">
                  <a>View All Post</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularPost;
