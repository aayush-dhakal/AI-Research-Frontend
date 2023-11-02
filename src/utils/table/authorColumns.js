import { Image, Tag } from "antd";

export const auhtorColumns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  // {
  //   title: "Topic",
  //   dataIndex: "topic",
  //   key: "topic",
  //   render: (_, { topic }) =>
  //     topic.map((singleTopic) => (
  //       <Tag color="green" key={singleTopic}>
  //         {singleTopic}
  //       </Tag>
  //     )),
  // },
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
];
