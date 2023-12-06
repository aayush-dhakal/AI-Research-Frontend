"use client";
import React, { useContext, useEffect } from "react";
import { Button, Table } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PostContext from "@/context/post/PostContext";
import { getPostColumns } from "@/utils/table/postColumns";

const Posts = () => {
  const router = useRouter();

  const { posts, getPosts, deletePost, setCurrentPost, totalPosts } =
    useContext(PostContext);

  const handleDeletePost = (id) => {
    deletePost(id);
  };

  const handleEditAuthor = (post) => {
    setCurrentPost(post);
    router.push("/admin/posts/edit");
  };

  const postColumns = getPostColumns(handleDeletePost, handleEditAuthor);

  const postsSort = {
    sortBy: "createdAt",
    sortOrder: "desc",
  };
  const numberOfPostsPerPage = 15;

  useEffect(() => {
    getPosts(postsSort, 1, numberOfPostsPerPage);
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <Link href="/admin">
            <Button type="primary">Go back to admin</Button>
          </Link>
        </div>
        <h3 className="mb-2 text-info">Posts</h3>
        <Link href="/admin/posts/add">
          <Button type="primary">Add Post</Button>
        </Link>
      </div>
      <Table
        dataSource={posts}
        columns={postColumns}
        pagination={{
          pageSize: numberOfPostsPerPage,
          total: totalPosts,
          onChange: (page) => {
            getPosts(postsSort, page, numberOfPostsPerPage);
          },
        }}
      />
    </div>
  );
};

export default Posts;
