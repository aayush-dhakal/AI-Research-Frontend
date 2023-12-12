import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Image } from "antd";

export const getTeamColumns = (handleDeleteTeam, handleEditTeam) => {
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Blogs Posted",
      dataIndex: "numberOfPosts",
      key: "blogPosted",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (_, { image }) => <Image src={image} width={50} />,
    },
    {
      title: "Google Scholar",
      dataIndex: "googleScholar",
      key: "googleScholar",
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedIn",
      key: "linkedIn",
    },
    {
      title: "ORCID",
      dataIndex: "ORCID",
      key: "ORCID",
    },
    {
      title: "Edit",
      dataIndex: "_id",
      key: "edit",
      render: (_, team) => (
        <div role="button" onClick={() => handleEditTeam(team)}>
          <EditOutlined />
        </div>
      ),
    },
    {
      title: "Delete",
      dataIndex: "_id",
      key: "delete",
      render: (_, { _id }) => (
        <div role="button" onClick={() => handleDeleteTeam(_id)}>
          <DeleteOutlined />
        </div>
      ),
    },
  ];
};
