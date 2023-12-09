"use client";

import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamState from "@/context/team/TeamState";
import PostState from "@/context/post/PostState";
import { toast } from "react-toastify";
import api from "../../utils/api";

export default function AdminLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        router.push("/login");
        return;
      }

      if (user.role !== "admin") {
        toast.warning("Your role is not an admin");
        router.push("/login");
        return;
      }

      localStorage.setItem("userId", user._id);

      setIsSuccess(true);
    })();
  });

  if (!isSuccess) {
    return <p>Loading.....</p>;
  }

  return (
    <main className="container m-5">
      <TeamState>
        <PostState>{children}</PostState>
      </TeamState>
    </main>
  );
}

export async function getUser() {
  try {
    const { data } = await api.get("/auth/me", {
      withCredentials: true, // this is absolutely essential to set the cookie in server api request
    });

    return {
      user: data.data,
      error: null,
    };
  } catch (error) {
    return {
      user: null,
      error,
    };
  }
}
