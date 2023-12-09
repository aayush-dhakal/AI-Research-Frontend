import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import PostContext from "@/context/post/PostContext";
import Image from "next/image";
import { formattedDate } from "@/utils/helpers";
import api from "../../utils/api";
import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";

const BlogClassicPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const { posts, getPosts, totalPosts } = useContext(PostContext);

  const [recentPosts, setRecentPosts] = useState([]);

  const numberOfBlogsPerPage = 6;

  const popularStoriesPaginationPage = 1;
  const popularStoriesPaginationLimit = 3;

  const generalStoriesSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const popularStoriesSort = {
    sortBy: "createdAt",
    sortOrder: "asc",
  };

  const getPopularPosts = async () => {
    try {
      const res = await api.get(
        `/post?sort=${popularStoriesSort.sortBy},${popularStoriesSort.sortOrder}&page=${popularStoriesPaginationPage}&limit=${popularStoriesPaginationLimit}`
      );
      setRecentPosts(res?.data?.data);
    } catch (err) {
      console.error(err);
    }
  };

  const [paginationConfig, setPaginationConfig] = useState({
    marginPagesDisplayed: 3,
    pageRangeDisplayed: 2,
  });

  const handlePaginationClick = (selectedPage) => {
    const currentPage = selectedPage.selected + 1;
    getPosts(generalStoriesSort, currentPage, numberOfBlogsPerPage);
  };

  useEffect(() => {
    const updatePaginationConfig = () => {
      const screenWidth = window.innerWidth;

      // Adjust values based on screen size
      if (screenWidth > 1200) {
        setPaginationConfig({ marginPagesDisplayed: 3, pageRangeDisplayed: 2 });
      } else if (screenWidth > 768) {
        setPaginationConfig({ marginPagesDisplayed: 2, pageRangeDisplayed: 2 });
      } else {
        setPaginationConfig({ marginPagesDisplayed: 1, pageRangeDisplayed: 2 });
      }
    };

    // Initial update
    updatePaginationConfig();

    // Update on window resize
    window.addEventListener("resize", updatePaginationConfig);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", updatePaginationConfig);
    };
  }, []);

  useEffect(() => {
    // pass sort and limit params in this function as params
    getPosts(generalStoriesSort, 1, numberOfBlogsPerPage, topic);
    getPopularPosts();
  }, []);

  if (posts?.length === 0) {
    return (
      <section className="blog-classic pt-100 pb-100">
        <div className="container">
          <div className="row gy-5">
            <div className="col-lg-8">
              <div className="row g-4">No posts</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-classic pt-100 pb-100">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-8">
            <div className="row g-4">
              {posts?.map((post) => (
                <div className="col-md-6" key={post._id}>
                  <div className="blog-grid-1">
                    {/* <span className="eg-badge badge--white">
                      {post.topics[0]}
                    </span> */}
                    <Link legacyBehavior href={`/blog/${post._id}`}>
                      <a className="image">
                        <Image
                          src={post.coverImage}
                          alt="image"
                          width={370}
                          height={250}
                        />
                      </a>
                    </Link>
                    <div className="content">
                      <ul>
                        <li>
                          <Link legacyBehavior href="/author-detail">
                            <a>Posted By {post.user?.name}</a>
                          </Link>
                        </li>
                        <li>
                          <Link legacyBehavior href={`/blog/${post._id}`}>
                            <a>{formattedDate(post.createdAt)}</a>
                          </Link>
                        </li>
                      </ul>
                      <h4>
                        <Link legacyBehavior href={`/blog/${post._id}`}>
                          <a>{post.title}</a>
                        </Link>
                      </h4>
                      <div className="bottom-area">
                        <Link legacyBehavior href={`/blog/${post._id}`}>
                          <a className=" eg-btn arrow-btn">
                            View Details
                            <i className="bi bi-arrow-right" />
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel="..."
              pageCount={totalPosts / numberOfBlogsPerPage}
              marginPagesDisplayed={paginationConfig.marginPagesDisplayed}
              pageRangeDisplayed={paginationConfig.pageRangeDisplayed}
              onPageChange={handlePaginationClick}
              containerClassName="pagination justify-content-center mt-5"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakClassName="page-item"
              breakLinkClassName="page-link"
              activeClassName="active"
            />
          </div>

          <div className="col-lg-4">
            <div className="post-side-bar-1">
              <div className="sidebar-widget-1">
                <h6 className="title">Popular Post</h6>
                {recentPosts?.map((recentPost) => (
                  <div className="blog-list-1 mb-25" key={recentPost._id}>
                    <a className="image">
                      <Image
                        src={recentPost.coverImage}
                        alt="image"
                        width={110}
                        height={90}
                      />
                    </a>
                    <div className="content">
                      <h6>
                        <Link legacyBehavior href={`/blog/${recentPost._id}`}>
                          <a>{recentPost.title}</a>
                        </Link>
                      </h6>
                      <ul>
                        <li>
                          <Link legacyBehavior href={`/blog/${recentPost._id}`}>
                            <a>{formattedDate(recentPost.createdAt)}</a>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="sidebar-widget-1">
                <h6 className="title">Stay Conected</h6>
                <ul className="social-4">
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
                      href="https://twitter.com/airesearch4good"
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="bx bxl-twitter" />
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
        </div>
      </div>
    </section>
  );
};

export default BlogClassicPage;
