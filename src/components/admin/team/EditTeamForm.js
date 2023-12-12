"use client";
import React, { useContext, useState } from "react";
import { Button, Form, Image, Input, Select } from "antd";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TeamContext from "@/context/team/TeamContext";
import useUserToken from "@/hooks/useUserToken";

const EditTeamForm = () => {
  const router = useRouter();

  const userToken = useUserToken();

  const { currentTeam, updateTeam, setCurrentTeam } = useContext(TeamContext);

  if (!currentTeam) router.push("/admin/teams");

  const [teamImage, setTeamImage] = useState(currentTeam?.image ?? null); // set value from props for update component

  const onImageUpload = (result) => {
    if (!result) {
      toast.error("Error uploading image");
      return;
    }

    setTeamImage(result?.info?.secure_url);
    toast.success("Image uploaded");
  };

  const onFinish = async (values) => {
    updateTeam(
      { id: currentTeam?._id, image: teamImage, ...values },
      userToken
    );
    router.push("/admin/teams");
    setCurrentTeam(null);
  };

  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="mb-4 d-flex justify-content-around">
        <h3 className="text-info ">Edit the team</h3>
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
          name: currentTeam?.name,
          description: currentTeam?.description,
          googleScholar: currentTeam?.googleScholar,
          linkedIn: currentTeam?.linkedIn,
          ORCID: currentTeam?.ORCID,
          role: currentTeam?.role,
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

        <Form.Item label="Google Scholar" name="googleScholar">
          <Input />
        </Form.Item>

        <Form.Item label="LinkedIn" name="linkedIn">
          <Input />
        </Form.Item>

        <Form.Item label="ORCID" name="ORCID">
          <Input />
        </Form.Item>

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select the role" }]}
        >
          <Select
            allowClear
            style={{
              width: "100%",
            }}
            placeholder="Please select the role"
            options={[
              { label: "Admin", value: "admin" },
              { label: "User", value: "user" },
            ]}
          />
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
          {teamImage && (
            <div className="mt-4">
              <Image
                width={200}
                // height={200}
                src={teamImage}
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

export default EditTeamForm;
