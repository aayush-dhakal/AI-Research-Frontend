"use client";

import AuthorContext from "@/context/author/AuthorContext";
import { auhtorColumns } from "@/utils/table/authorColumns";
import { Button, Table } from "antd";
import React, { useContext, useEffect } from "react";

const author = () => {
  const { authors, getAuthors } = useContext(AuthorContext);

  useEffect(() => {
    getAuthors();
  }, []);

  return (
    <div>
      <div>
        <div className="text-white">Authors</div>
        <Button>Add Author</Button>
      </div>
      <Table dataSource={authors?.data} columns={auhtorColumns} />
    </div>
  );
};

export default author;
