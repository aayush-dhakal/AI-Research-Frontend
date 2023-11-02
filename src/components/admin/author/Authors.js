"use client";

import AuthorContext from "@/context/author/AuthorContext";
import { auhtorColumns } from "@/utils/table/authorColumns";
import { Button, Table } from "antd";
import Link from "next/link";
import React, { useContext, useEffect } from "react";

const Authors = () => {
  const { authors, getAuthors } = useContext(AuthorContext);

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <h3 className="mb-2 text-info">Authors</h3>
        <Link href="/admin/authors/add">
          <Button type="primary">Add Author</Button>
        </Link>
      </div>
      <Table dataSource={authors?.data} columns={auhtorColumns} />
    </div>
  );
};

export default Authors;
