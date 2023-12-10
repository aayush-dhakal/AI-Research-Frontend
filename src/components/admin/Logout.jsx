"use client";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import api from "@/utils/api";

const Logout = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout", {
        withCredentials: true, // this is absolutely essential to set the cookie in browser
      });
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
