import React from "react";
import Logout from "@/components/admin/Logout";
import { Button } from "antd";
import Link from "next/link";

const admin = () => {
  return (
    <>
      <div>
        <Link href="/admin/teams">
          <Button type="primary">Teams</Button>
        </Link>
      </div>
      <div className="mt-3">
        <Link href="/admin/posts">
          <Button type="primary">Posts</Button>
        </Link>
      </div>
      <div className="mt-3">
        <Logout />
      </div>
    </>
  );
};

export default admin;
