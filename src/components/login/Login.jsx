"use client";

import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import { useRouter } from "next/navigation";
import { getUser } from "@/app/admin/layout";
import { toast } from "react-toastify";
import api from "../../utils/api";

const Login = () => {
  console.log(
    "process.env.NEXT_SERVER_API...",
    process.env.NEXT_PUBLIC_SERVER_API
  );
  const router = useRouter();

  const onFinish = async (values) => {
    try {
      await api.post("/auth/login", values, {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });
      router.push("/admin");
      toast.success("Login Success");
    } catch (error) {
      toast.error("Login Failed", error);
    }
  };

  const handleSignup = () => {
    router.push("signup");
  };

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

      if (user) {
        if (user.role === "admin") {
          router.push("/admin");
        } else {
          router.push("/login");
        }
        return;
      }
    })();
  });

  return (
    <>
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

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Password is required",
            },
          ]}
        >
          <Input.Password
            placeholder="Enter password"
            style={{
              width: 260,
            }}
          />
        </Form.Item>

        <Form.Item label=" " colon={false}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>

          <div className="mt-3">
            {/* <Button type="link" className="ml-0 p-0">
              Signup
            </Button> */}
            <Button className="text-success" onClick={handleSignup}>
              Signup
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
export default Login;
