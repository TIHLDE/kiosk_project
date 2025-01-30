"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReloadComponent() {
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      router.refresh();
      console.log("This will run every second!");
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  return <div></div>;
}
