import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import TeamContext from "@/context/team/TeamContext";
import { formattedDate } from "@/utils/helpers";

function Author() {
  const { teams, getTeams, totalTeams } = useContext(TeamContext);

  const numberOfTeamsPerPage = 16;

  const generalTeamsSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };

  const [paginationConfig, setPaginationConfig] = useState({
    marginPagesDisplayed: 3,
    pageRangeDisplayed: 2,
  });

  const handlePaginationClick = (selectedPage) => {
    const currentPage = selectedPage.selected + 1;
    getTeams(generalTeamsSort, currentPage, numberOfTeamsPerPage);
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

  console.log("teams...", teams);

  useEffect(() => {
    getTeams(generalTeamsSort, 1, numberOfTeamsPerPage);
  }, []);

  return (
    <section className="author-section pt-100 pb-100">
      <div className="container">
        <div className="row g-4 mb-60">
          {teams?.map((team) => (
            <div className="col-lg-3 col-md-6 col-sm-6" key={team._id}>
              <div className="author-1">
                <div className="author-front">
                  <Link legacyBehavior href={`/team/${team._id}`}>
                    <Image
                      src={team.image}
                      alt="image"
                      width={85}
                      height={85}
                      className="image"
                    />
                  </Link>
                  <h4>{team.name}</h4>
                  <ul>
                    <li>
                      <span>Post</span>
                      <span>{team.numberOfPosts}</span>
                    </li>
                    {/* <li>
                      <span>Email</span>
                      <span>{team.email}</span>
                    </li> */}
                    <li>
                      <span>Joined</span>
                      <span>{formattedDate(team.createdAt, true)}</span>
                    </li>
                  </ul>
                </div>
                <div className="author-back">
                  <ul className="social-list">
                    <li>
                      <a href={team.googleScholar}>
                        <span>
                          <i className="bx bxl-google" />
                          Google Scholor
                        </span>
                        <span>
                          <strong>3.5K</strong>
                          &nbsp;Like
                        </span>
                      </a>
                    </li>
                    {/* <li>
                      <a href="https://www.twitter.com/">
                        <span>
                          <i className="bx bxl-twitter" />
                          Twitter
                        </span>
                        <span>
                          <strong>60k</strong>
                          &nbsp;Follower
                        </span>
                      </a>
                    </li> */}
                    <li>
                      <a href={team.linkedIn}>
                        <span>
                          <i className="bx bxl-linkedin" />
                          LinkedIn
                        </span>
                        <span>
                          <strong>25k</strong>
                          &nbsp;Follower
                        </span>
                      </a>
                    </li>
                    <li>
                      <a href={team.ORCID}>
                        <span>
                          <i className="bx bi-archive" />
                          ORCID
                        </span>
                        <span>
                          <strong>75k</strong>
                          &nbsp;Follower
                        </span>
                      </a>
                    </li>
                  </ul>
                  <Link legacyBehavior href={`/team/${team._id}`}>
                    <a className="eg-btn arrow-btn four">
                      View Details
                      <i className="bi bi-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row text-center justify-content-center">
          <div className="col-md-6">
            <ReactPaginate
              previousLabel="<<"
              nextLabel=">>"
              breakLabel="..."
              pageCount={totalTeams / numberOfTeamsPerPage}
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
        </div>
      </div>
    </section>
  );
}

export default Author;
