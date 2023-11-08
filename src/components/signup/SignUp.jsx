"use client";

import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/admin/layout";
import { toast } from "react-toastify";
import api from "../../utils/api";

const SignUp = () => {
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      const res = await api.post("/auth/register", values, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });
      router.push("/admin");
      toast.success("Login Success");
    } catch (error) {
      toast.error("Login Failed", error);
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
              width: 260,
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
              width: 260,
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
              width: 260,
            }}
            type="password"
            placeholder="Please enter your password"
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
