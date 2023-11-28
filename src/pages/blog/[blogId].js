import React from "react";
import { useRouter } from "next/router";

const Blog = () => {
  const router = useRouter();
  const blogId = router.query.blogId;
  console.log("blogId...", blogId);

  return <div>Blog</div>;
};

export default Blog;
