"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import WorkoutApp from "@/components/WorkoutApp";

export default function AppPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!sessionStorage.getItem("gym_session_key")) {
      router.replace("/login");
    } else {
      setReady(true);
    }
  }, [router]);

  if (!ready) return null;
  return <WorkoutApp />;
}
