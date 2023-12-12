import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useUserToken() {
  const [userToken, setUserToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUserToken(JSON.parse(token));
    } else {
      // Redirect to login if token not found
      router.push("/login");
    }
  }, [router]);

  return userToken;
}
