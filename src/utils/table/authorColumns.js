import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const getAuthorColumns = (handleDeleteAuthor, handleEditAuthor) => {
  return [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { image }) => <Image src={image} width={50} />,
    },
    {
      title: "Facebook",
      dataIndex: "facebook",
      key: "facebook",
    },
    {
      title: "Twitter",
      dataIndex: "twitter",
      key: "twitter",
    },
    {
      title: "Instagram",
      dataIndex: "instagram",
      key: "instagram",
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "edit",
      render: (_, author) => (
        <div role="button" onClick={() => handleEditAuthor(author)}>
          <EditOutlined />
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (_, { _id }) => (
        <div role="button" onClick={() => handleDeleteAuthor(_id)}>
          <DeleteOutlined />
        </div>
      ),
    },
  ];
};
