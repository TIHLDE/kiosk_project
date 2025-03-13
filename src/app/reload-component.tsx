"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ReloadComponent() {
  const router = useRouter();

  useEffect(() => {
    // Regular refresh interval
    const interval = setInterval(() => {
      router.refresh();
    }, 1000 * 10);

    // Connection error handling
    const handleConnectionError = () => {
      if (!navigator.onLine) {
        window.location.reload();
      }
    };

    window.addEventListener("offline", handleConnectionError);

    window.addEventListener("error", (event) => {
      if (
        event.message.includes("fetch") ||
        event.message.includes("network")
      ) {
        window.location.reload();
      }
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener("offline", handleConnectionError);
    };
  }, [router]);

  return null;
}
