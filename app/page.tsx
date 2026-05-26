"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Root() {
  const router = useRouter();

  useEffect(() => {
    const key = sessionStorage.getItem("gym_session_key");
    if (key) {
      router.replace("/app");
    } else {
      router.replace("/login");
    }
  }, [router]);

  return null;
}
