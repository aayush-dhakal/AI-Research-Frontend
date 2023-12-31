"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // await api.post("/auth/logout", {
      //   // withCredentials: true, // this is absolutely essential to set the cookie in browser
      // });

      localStorage.removeItem("token");

      toast.success("You are logged out");
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("Error logging out");
    }
  };

  return (
    <div>
      <Button onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Logout;
