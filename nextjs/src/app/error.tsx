"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Error({
  error
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ERROR]: ", error.message);
    setTimeout(() => {
      window.location.reload();
    }, 10000);
  }, [error]);

  return (
    <div className="bg-white w-screen h-screen flex items-center justify-center">
      <Image
        src="/drift-logo.png"
        alt="Drift logo"
        width={600}
        height={600}
      />
    </div>
  );
}