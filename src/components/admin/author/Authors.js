"use client";

import AuthorContext from "@/context/author/AuthorContext";
import { getAuthorColumns } from "@/utils/table/authorColumns";
import { Button, Table } from "antd";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

const Authors = () => {
  const { authors, getAuthors, deleteAuthor } = useContext(AuthorContext);

  const handleDeleteAuthor = (id) => {
    deleteAuthor(id);
  };

  const authorColumns = getAuthorColumns(handleDeleteAuthor);

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <div>
          <Link href="/admin">
            <Button type="primary">Go back to admin</Button>
          </Link>
        </div>
        <h3 className="mb-2 text-info">Authors</h3>
        <Link href="/admin/authors/add">
          <Button type="primary">Add Author</Button>
        </Link>
      </div>
      <Table dataSource={authors} columns={authorColumns} />
    </div>
  );
};

export default Authors;
