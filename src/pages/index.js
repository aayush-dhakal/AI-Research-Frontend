import React from "react";
import PopularPost from "@/components/home/PopularPost";
import PostState from "@/context/post/PostState";
import TeamState from "@/context/team/TeamState";

function Homepage() {
  return (
    <>
      <TeamState>
        <PostState>
          <PopularPost />
        </PostState>
      </TeamState>
    </>
  );
}

export default Homepage;
