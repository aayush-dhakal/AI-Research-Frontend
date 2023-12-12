"use client";
import React, { useState, useRef, useMemo, useContext } from "react";
import { Button, Form, Image, Input, Select } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JoditEditor from "jodit-react";
import { AI_Research_Topics } from "@/utils/helpers";
import PostContext from "@/context/post/PostContext";
import useUserToken from "@/hooks/useUserToken";

const PostForm = () => {
  const router = useRouter();

  const userToken = useUserToken();

  const { addPost } = useContext(PostContext);

  const [postImage, setPostImage] = useState(null); // set value from props for update component

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: "Start typing...",
      minHeight: 700,
    };
  }, []);

  const onImageUpload = (result) => {
    if (!result) {
      toast.error("Error uploading image");
      return;
    }

    setPostImage(result?.info?.secure_url);
    toast.success("Image uploaded. You can save the post now!");
  };

  const onFinish = async (values) => {
    if (!postImage) {
      toast.error("Please upload the image");
      return;
    }

    addPost(
      {
        ...values,
        description: content,
        user: localStorage.getItem("userId"),
        coverImage: postImage,
      },
      userToken
    );
    router.push("/admin/posts");
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="mb-4 d-flex justify-content-around">
        <h3 className="text-info ">Add a post</h3>
        <div>
          <Link href="/admin">
            <Button type="primary">Go back to admin</Button>
          </Link>
        </div>
      </div>
      <Form
        name="basic"
        layout="horizontal"
        labelCol={{
          span: 3,
        }}
        labelAlign="right"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 18,
        // }}
        style={{
          maxWidth: "100vw",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: "Please enter the title.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Cover Image">
          <CldUploadWidget
            uploadPreset="aniket-research"
            onUpload={(result) => onImageUpload(result)}
          >
            {({ open }) => {
              function handleOnClick(e) {
                e.preventDefault();
                open();
              }
              return (
                <button className="button" onClick={handleOnClick}>
                  Upload an Image
                </button>
              );
            }}
          </CldUploadWidget>
          {postImage && (
            <div className="mt-4">
              <Image width={200} src={postImage} />
            </div>
          )}
        </Form.Item>

        {/* wrapping select inside form.item for styling(basically to align all the forms fields in same place and also select being inside form.item now you can access topics from form values) */}
        <Form.Item
          label="Topics"
          name="topics"
          rules={[{ required: true, message: "Please select the topic" }]}
        >
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select the topic"
            options={AI_Research_Topics}
          />
        </Form.Item>

        <Form.Item label="Description">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1} // tabIndex of textarea
              onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
              // onChange={(newContent) => setContent(newContent)}
            />
          </div>
        </Form.Item>

        {/* <div>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div> */}

        <Form.Item
          wrapperCol={{
            offset: 3,
          }}
        >
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
