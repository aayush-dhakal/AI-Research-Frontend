import { Button } from "antd";
import Link from "next/link";

const admin = () => {
  return (
    <>
      <div>
        <Link href="/admin/authors">
          <Button type="primary">Authors</Button>
        </Link>
      </div>
      <div className="mt-3">
        <Link href="/admin/posts">
          <Button type="primary">Posts</Button>
        </Link>
      </div>
    </>
  );
};

export default admin;
