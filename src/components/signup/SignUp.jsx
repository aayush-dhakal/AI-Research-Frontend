"use client";

import React from "react";
import { Button, Form, Input, Select, Space, Tooltip, Typography } from "antd";
import axios from "axios";

const { Option } = Select;

const onFinish = async (values) => {
  console.log("Received values of form: ", values);
  const res = await axios.post(
    "http://localhost:5000/api/auth/register",
    values
  );
  console.log("res.data...", res.data);
};

const SignUp = () => (
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
        Submit
      </Button>
    </Form.Item>
  </Form>
);
export default SignUp;
