"use client"

import CardWrapper from "./wrapper";
import { useEffect, useState } from "react";
import { Purchase } from "../../types";

export default function EnergyDrinkGraph(props: any){
  const [allPurchases, setAllPurchases] = useState<Purchase[]>(props.data);
  let numberOfEnergydrinks2025: number = 0;

  useEffect(() => {
    numberOfEnergydrinks2025 = numberOfEnergyDrinksBought(allPurchases);
  }, [allPurchases]);

  function numberOfEnergyDrinksBought(purchases: Purchase[]): number {
    return purchases.reduce((acc, purchase) => {
      return (
        acc +
        purchase.products.reduce((acc, product) => {
          const name = product.name.toLowerCase();
          const isEnergyDrink =
            name.includes("monster") ||
            name.includes("red bull") ||
            name.includes("rockstar") ||
            name.includes("battery") ||
            name.includes("powerking");
  
          return acc + (isEnergyDrink ? 1 : 0);
        }, 0)
      );
    }, 0);
  }

  return(
    <CardWrapper>
      <div>

      </div>
    </CardWrapper>
  );
}