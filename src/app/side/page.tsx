"use client";

import { useEffect } from "react";

export default function Page() {
  const func = async () => {
    const response = await fetch("/api/test");

    const data = await response.json();

    console.log(data);
  };

  useEffect(() => {
    func();
  }, []);

  return <p></p>;
}
