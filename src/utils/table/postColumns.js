"use client";
import { Image, Tag } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

export const getPostColumns = (handleDeletePost) => {
  return [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Topics",
      dataIndex: "topics",
      key: "topics",
      render: (_, { topics }) =>
        topics.map((topic) => (
          <Tag color="green" key={topic}>
            {topic}
          </Tag>
        )),
    },
    {
      title: "Cover Image",
      dataIndex: "coverImage",
      key: "coverImage",
      render: (_, { coverImage }) => <Image src={coverImage} width={50} />,
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "authorName",
      render: (_, { author }) => author.name,
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (_, { _id }) => (
        <div role="button" onClick={() => handleDeletePost(_id)}>
          <DeleteOutlined />
        </div>
      ),
    },
  ];
};
