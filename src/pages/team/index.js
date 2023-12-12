import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import TeamContext from "@/context/team/TeamContext";
import { getYear } from "@/utils/helpers";

function Author() {
  const { teams, getTeams, totalTeams } = useContext(TeamContext);

  const numberOfTeamsPerPage = 16;

  const generalTeamsSort = {
    sortBy: "createdAt",
    sortOrder: "asc",
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

  useEffect(() => {
    getTeams(generalTeamsSort, 1, numberOfTeamsPerPage);
  }, []);

  return (
    <section className="author-section pt-100 pb-100">
      <div className="container">
        <div className="row g-4 mb-60">
          <h1 className="text-center">Our Team</h1>
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
                  <div>{team.description}</div>
                  <div>{team.email}</div>
                  <ul>
                    {team.numberOfPosts > 0 && (
                      <li>
                        <span>Blogs Posted</span>
                        <span>{team.numberOfPosts}</span>
                      </li>
                    )}
                    {/* <li>
                      <span>Email</span>
                      <span>{team.email}</span>
                    </li> */}
                    <li>
                      <span>Joined</span>
                      <span>{getYear(team.createdAt)}</span>
                    </li>
                  </ul>
                </div>
                <div className="author-back">
                  <ul className="social-list">
                    {team.googleScholar && (
                      <li>
                        <a href={team.googleScholar}>
                          <span>
                            <i className="bx bxl-google" />
                            Google Scholor
                          </span>
                        </a>
                      </li>
                    )}
                    {team.linkedIn && (
                      <li>
                        <a href={team.linkedIn}>
                          <span>
                            <i className="bx bxl-linkedin" />
                            LinkedIn
                          </span>
                        </a>
                      </li>
                    )}
                    {team.ORCID && (
                      <li>
                        <a href={team.ORCID}>
                          <span>
                            <i className="bx bi-archive" />
                            ORCID
                          </span>
                        </a>
                      </li>
                    )}
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
