"use client";

import { useEffect, useState } from "react";
import { PurchaseStatistics } from "./api/zettle/zettle_data";

export default function Home() {
  const [data, setData] = useState<PurchaseStatistics | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data");
      try {
        const response = await fetch("/api/zettle");
        const newData = await response.json();
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    const intervalId = setInterval(fetchData, 10000);

    return () => clearInterval(intervalId);
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
      <h1 className="text-2xl font-bold pt-10">
        Mest solgte produkter siste 1000 betalinger
      </h1>
      {data ? (
        <div>
          <ul>
            {data.mostSoldProductsByItems.slice(0, 10).map((product) => (
              <li key={product.name}>
                {product.name}: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <h1 className="text-2xl font-bold pt-10">
        Mest inntektsgivende produkter siste 1000 betalinger
      </h1>
      {data ? (
        <div>
          <ul>
            {data.mostSoldProductsByRevenue.slice(0, 10).map((product) => (
              <li key={product.name}>
                {product.name}: {product.amount},-
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
      <h1 className="text-2xl font-bold pt-10">
        Antall energidrikker solgt siste 1000 betalinger
      </h1>
      {data ? (
        <div>
          <p>{data.numberOfEnergyDrinksSold}</p>
        </div>
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}
