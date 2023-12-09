import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Image from "next/image";
import { formattedDate } from "@/utils/helpers";
import ReactPaginate from "react-paginate";

const AuthorDetails = () => {
  const router = useRouter();
  const teamId = router.query.teamId;

  const [team, setTeam] = useState();
  const [blogs, setBlogs] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState([]);

  const numberOfBlogsPerPage = 6;

  const blogsSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const getTeam = async () => {
    try {
      const res = await api.get(`/auth/user/${teamId}`);

      setTeam(res?.data?.data);
    } catch (err) {
      console.error(err);
      toast.error("Error getting the team");
    }
  };

  const getPostsForTeam = async (currentPage) => {
    try {
      const res = await api.get(
        `/post/user/${teamId}?sort=${blogsSort.sortBy},${blogsSort.sortOrder}&page=${currentPage}&limit=${numberOfBlogsPerPage}`
      );
      setBlogs(res?.data?.data);
      setTotalBlogs(res?.data?.total);
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
    getPostsForTeam(currentPage, numberOfBlogsPerPage);
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
    getTeam();
    getPostsForTeam(1); // on first render setting current page to 1
  }, [teamId]);

  return (
    <section className="author-section pt-100 pb-100">
      <div className="container">
        <div className="row gy-5">
          <div className="col-lg-8">
            <div className="author-details">
              <Image
                src={team?.image}
                alt="image"
                width={170}
                height={170}
                className="rounded-circle"
              />
              <div className="author-info">
                <h2>{team?.name}</h2>
                <ul className="category">
                  {team?.linkedIn && (
                    <li>
                      <a
                        href={team?.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </li>
                  )}
                  {team?.ORCID && (
                    <li>
                      <a
                        href={team?.ORCID}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        ORCID
                      </a>
                    </li>
                  )}
                  {team?.googleScholar && (
                    <li>
                      <a
                        href={team?.googleScholar}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Google-Scholor
                      </a>
                    </li>
                  )}
                </ul>
                <p>{team?.description}</p>

                {totalBlogs > 0 && (
                  <ul className="meta-list">
                    <li>
                      <img
                        src="/assets/images/icons/total-post.svg"
                        alt="image"
                      />
                      Blogs Posted: <span>{totalBlogs}</span>
                    </li>
                  </ul>
                )}
              </div>
            </div>

            {blogs?.map((blog) => {
              return (
                <div key={blog._id} className="blog-list-2">
                  <div className="date">
                    {formattedDate(blog.createdAt, true)}
                  </div>
                  <div className="content">
                    <ul>
                      {blog.topics.map((topic, index) => (
                        <li key={index}>
                          <Link legacyBehavior href="/blog">
                            <a>{topic}</a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <h4>
                      <Link legacyBehavior href={`/blog/${blog._id}`}>
                        <a>{blog.title}</a>
                      </Link>
                    </h4>
                    <div className="bottom-area">
                      <Link legacyBehavior href={`/blog/${blog._id}`}>
                        <a className=" eg-btn arrow-btn">
                          View Details
                          <i className="bi bi-arrow-right" />
                        </a>
                      </Link>
                    </div>
                  </div>
                  <Link legacyBehavior href={`/blog/${blog._id}`}>
                    <a className="image">
                      <Image
                        src={blog?.coverImage}
                        alt="image"
                        width={250}
                        height={172}
                      />
                    </a>
                  </Link>
                </div>
              );
            })}

            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel="..."
              pageCount={totalBlogs / numberOfBlogsPerPage}
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
            <div className="post-side-bar-1"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorDetails;
