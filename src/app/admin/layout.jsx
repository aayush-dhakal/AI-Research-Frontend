"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./admin.module.css";
import AuthorState from "@/context/author/AuthorState";

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

      setIsSuccess(true);
    })();
  });

  if (!isSuccess) {
    return <p>Loading.....</p>;
  }

  return (
    <main className={styles.adminContainer}>
      <AuthorState>{children}</AuthorState>
    </main>
  );
}

export async function getUser() {
  try {
    const { data } = await axios.get("http://localhost:5000/api/auth/me", {
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
