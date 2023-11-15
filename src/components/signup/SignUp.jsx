"use client";

import React, { useEffect, useState } from "react";
import { Button, Form, Input, Image } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/admin/layout";
import { toast } from "react-toastify";
import api from "../../utils/api";
import TextArea from "antd/es/input/TextArea";

const SignUp = () => {
  const router = useRouter();

  const [userImage, setUserImage] = useState(null);

  const onImageUpload = (result) => {
    if (!result) {
      toast.error("Error uploading image");
      return;
    }

    setUserImage(result?.info?.secure_url);
    toast.success("Image uploaded");
  };

  const onFinish = async (values) => {
    if (!userImage) {
      toast.error("Please upload the image");
      return;
    }

    try {
      const res = await api.post(
        "/auth/register",
        { ...values, image: userImage },
        {
          withCredentials: true, // this is absolutely essential to set the cookie in browser
        }
      );
      router.push("/login");
      toast.success("Registration Success");
    } catch (error) {
      toast.error("Registration Failed", error);
    }
  };

  const handleLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

      if (user) {
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/signup");
        }
        return;
      }
    })();
  });

  return (
    <Form
      name="complex-form"
      onFinish={onFinish}
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item label="Name">
        <Form.Item
          name="name"
          noStyle
          rules={[
            {
              required: true,
              message: "Name is required",
            },
          ]}
        >
          <Input
            style={{
              width: 400,
            }}
            placeholder="Please enter your name"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Email">
        <Form.Item
          name="email"
          noStyle
          rules={[
            {
              required: true,
              message: "Email is required",
            },
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
          ]}
        >
          <Input
            style={{
              width: 400,
            }}
            placeholder="Please enter your email"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Password">
        <Form.Item
          name="password"
          noStyle
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input
            style={{
              width: 400,
            }}
            type="password"
            placeholder="Please enter your password"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Description">
        <Form.Item
          name="description"
          noStyle
          rules={[
            {
              required: true,
              message: "Description is required",
            },
          ]}
        >
          <TextArea
            style={{
              width: 400,
              height: 100,
            }}
            placeholder="Please enter your description"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="Your Image">
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
        {userImage && (
          <div className="mt-4">
            <Image width={200} src={userImage} />
          </div>
        )}
      </Form.Item>

      <Form.Item label="GoogleScholar">
        <Form.Item name="googleScholar" noStyle>
          <Input
            style={{
              width: 400,
            }}
            placeholder="Please enter your googleScholar"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="LinkedIn">
        <Form.Item name="linkedIn" noStyle>
          <Input
            style={{
              width: 400,
            }}
            placeholder="Please enter your LinkedIn"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label="ORCID">
        <Form.Item name="ORCID" noStyle>
          <Input
            style={{
              width: 400,
            }}
            placeholder="Please enter your ORCID"
          />
        </Form.Item>
      </Form.Item>

      <Form.Item label=" " colon={false}>
        <Button type="primary" htmlType="submit">
          Signup
        </Button>

        <div className="mt-3">
          {/* <Button type="link" className="ml-0 p-0">
              Signup
            </Button> */}
          <Button className="text-success" onClick={handleLogin}>
            Login
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};

export default SignUp;
