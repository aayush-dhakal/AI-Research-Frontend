"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamState from "@/context/team/TeamState";
import PostState from "@/context/post/PostState";
import { toast } from "react-toastify";
import api from "../../utils/api";
import useUserToken from "@/hooks/useUserToken";

export default function AdminLayout({ children }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const userToken = useUserToken();

  const router = useRouter();

  useEffect(() => {
    if (userToken) {
      (async () => {
        const { user, error } = await getUser(userToken);

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
    }
  }, [userToken, router]); // Depend on userToken to trigger this effect

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

export async function getUser(userToken) {
  try {
    const { data } = await api.get("/auth/me", {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    });

    return {
      user: data.data,
      error: null,
    };
  } catch (error) {
    console.error("Error in getUser:", error);
    return {
      user: null,
      error,
    };
  }
}
