import { Button } from "antd";
import Link from "next/link";

const admin = () => {
  return (
    <div>
      <Link href="/admin/authors">
        <Button type="primary">Authors</Button>
      </Link>
    </div>
  );
};

export default admin;
