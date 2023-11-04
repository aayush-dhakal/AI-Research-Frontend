"use client";
import React, { useState, useRef, useMemo, useContext, useEffect } from "react";
import { Button, Form, Image, Input, Select } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import JoditEditor from "jodit-react";
import { AI_Research_Topics, getAuthorOptions } from "@/utils/helpers";
import AuthorContext from "@/context/author/AuthorContext";
import PostContext from "@/context/post/PostContext";

const EditPostForm = () => {
  const router = useRouter();

  const { currentPost, updatePost, setCurrentPost } = useContext(PostContext);

  const [coverImage, setCoverImage] = useState(currentPost?.coverImage ?? null);
  const [topics, setTopics] = useState(currentPost?.topics ?? []);
  const [author, setAuthor] = useState(currentPost?.author?._id ?? null);

  const editor = useRef(null);
  const [content, setContent] = useState(currentPost?.description ?? "");

  const { authors, getAuthors } = useContext(AuthorContext);

  const authorOptions = getAuthorOptions(authors);

  const config = useMemo(() => {
    return {
      readonly: false,
      placeholder: "Start typing...",
    };
  }, []);

  const onImageUpload = (result) => {
    if (!result) {
      toast.error("Error uploading image");
      return;
    }

    setCoverImage(result?.info?.secure_url);
    toast.success("Image uploaded");
  };

  const handleTopicChange = (value) => {
    setTopics(value);
  };

  const handleAuthorChange = (value) => {
    setAuthor(value);
  };

  const onFinish = async (values) => {
    if (topics.length === 0 || !author) {
      toast.error("Fill all the fields");
      return;
    }
    if (!coverImage) {
      toast.error("Please upload the image");
      return;
    }

    updatePost({
      id: currentPost?._id,
      ...values,
      description: content,
      topics,
      author,
      coverImage,
    });
    router.push("/admin/posts");
    setCurrentPost(null);
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
        <h3 className="text-info ">Edit the post</h3>
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
        initialValues={{
          title: currentPost?.title,
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
          {coverImage && (
            <div className="mt-4">
              <Image width={200} src={coverImage} />
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
            defaultValue={topics}
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
            defaultValue={author}
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
            Update
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditPostForm;
