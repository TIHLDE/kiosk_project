"use client";

import { useEffect, useState } from "react";

interface ZettleData {
  averagePayment: number;
}

export default function Home() {
  const [data, setState] = useState<ZettleData | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/zettle");
      const data = await response.json();
      setState(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black w-full h-screen text-white flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">
        Gjennomsnittlig betalingsbeløp siste 1000 betalinger
      </h1>
      {data ? (
        <div>
          <p className="text-4xl pt-10">{data.averagePayment},-</p>
        </div>
      ) : (
        <div className="text-4xl pt-10">
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
