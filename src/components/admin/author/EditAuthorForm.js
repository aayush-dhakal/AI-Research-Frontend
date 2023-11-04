"use client";
import React, { useContext, useState } from "react";
import { Button, Form, Image, Input } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthorContext from "@/context/author/AuthorContext";

const EditAuthorForm = () => {
  const router = useRouter();

  const { currentAuthor, updateAuthor, setCurrentAuthor } =
    useContext(AuthorContext);

  if (!currentAuthor) router.push("/admin/authors");

  console.log("currentAuthor...", currentAuthor);

  const [authorImage, setAuthorImage] = useState(currentAuthor?.image ?? null); // set value from props for update component

  const onImageUpload = (result) => {
    if (!result) {
      toast.error("Error uploading image");
      return;
    }

    setAuthorImage(result?.info?.secure_url);
    toast.success("Image uploaded");
  };

  const onFinish = async (values) => {
    updateAuthor({ id: currentAuthor?._id, image: authorImage, ...values });
    router.push("/admin/authors");
    setCurrentAuthor(null);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="mb-4 d-flex justify-content-around">
        <h3 className="text-info ">Edit the author</h3>
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
          maxWidth: 600,
        }}
        initialValues={{
          name: currentAuthor?.name,
          description: currentAuthor?.description,
          facebook: currentAuthor?.facebook,
          twitter: currentAuthor?.twitter,
          instagram: currentAuthor?.instagram,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please enter the name.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[
            {
              required: true,
              message: "Please enter the description.",
            },
          ]}
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <Form.Item label="Facebook" name="facebook">
          <Input />
        </Form.Item>

        <Form.Item label="Twitter" name="twitter">
          <Input />
        </Form.Item>

        <Form.Item label="Instagram" name="instagram">
          <Input />
        </Form.Item>

        <Form.Item label="Image">
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
          {authorImage && (
            <div className="mt-4">
              <Image
                width={200}
                // height={200}
                src={authorImage}
                // className="rounded-circle"
              />
            </div>
          )}
        </Form.Item>

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

export default EditAuthorForm;
