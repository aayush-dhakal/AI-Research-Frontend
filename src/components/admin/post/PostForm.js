"use client";
import React, { useState, useRef, useMemo, useContext, useEffect } from "react";
import { Button, Form, Image, Input, Select } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JoditEditor from "jodit-react";
import { AI_Research_Topics, getAuthorOptions } from "@/utils/helpers";
import AuthorContext from "@/context/author/AuthorContext";
import PostContext from "@/context/post/PostContext";

const PostForm = () => {
  const router = useRouter();

  const { addPost } = useContext(PostContext);

  const [postImage, setPostImage] = useState(null); // set value from props for update component
  const [topics, setTopics] = useState(null);
  const [author, setAuthor] = useState(null);

  const editor = useRef(null);
  const [content, setContent] = useState("");

  const { authors, getAuthors } = useContext(AuthorContext);

  const authorOptions = getAuthorOptions(authors);

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: "Start typings...",
    };
  }, []);

  const onImageUpload = (result) => {
    if (!result) {
      toast.error("Error uploading image");
      return;
    }

    setPostImage(result?.info?.secure_url);
    toast.success("Image uploaded");
  };

  const handleTopicChange = (value) => {
    setTopics(value);
  };

  const handleAuthorChange = (value) => {
    setAuthor(value);
  };

  const onFinish = async (values) => {
    if (!topics || !author) {
      toast.error("Fill all the fields");
      return;
    }
    if (!postImage) {
      toast.error("Please upload the image");
      return;
    }

    addPost({
      ...values,
      description: content,
      topics,
      author,
      coverImage: postImage,
    });
    router.push("/admin/posts");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  useEffect(() => {
    getAuthors();
  }, []);

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
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 900,
        }}
        // initialValues={{
        //   name: "aayush",
        //   description: "this is sample",
        // }}
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

        {/* wrapping select inside form.item for styling(basically to align all the forms fields in same palce) */}
        <Form.Item label="Topics">
          <Select
            mode="multiple"
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select the topic"
            onChange={handleTopicChange} // select is not part of ant design form so we have to manually handle the onChange or else its value will not be reflected after hitting submit button.
            options={AI_Research_Topics}
          />
        </Form.Item>

        <Form.Item label="Select Author">
          <Select
            showSearch
            placeholder="Search to Select"
            filterOption={(input, option) =>
              (option?.label ?? "").includes(input)
            }
            filterSort={(optionA, optionB) =>
              (optionA?.label ?? "")
                .toLowerCase()
                .localeCompare((optionB?.label ?? "").toLowerCase())
            }
            optionFilterProp="children"
            options={authorOptions}
            onChange={handleAuthorChange}
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
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PostForm;
