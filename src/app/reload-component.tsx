"use client";

import { useEffect } from "react";

export default function ReloadComponent() {
  useEffect(() => {
    const interval = setInterval(() => {
      window.location.reload();
      console.log("This will run every second!");
    }, 1000 * 10);
    return () => clearInterval(interval);
  }, []);

  return <div></div>;
}
