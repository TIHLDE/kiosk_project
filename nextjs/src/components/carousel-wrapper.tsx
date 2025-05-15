"use client";

import type { ProductCount, Purchase } from "../types";
import { useEffect } from "react";
import { CarouselContent, useCarousel } from "./motion-primitives/carousel";
import TopSalesCard from "./display-cards/top-sales";
import AverageSpentCard from "./display-cards/average-spent";
import EnergyDrinkCard from "./display-cards/energy-drink";
import TotalProductsSold from "./display-cards/all-sold";
import SubwaySurfers from "./display-cards/subway";

export default function CarouselContentWrapper({
    data
}: { data: Purchase[] }) {
    const { itemsCount, setIndex } = useCarousel();

    useEffect(() => {
        const interval = setInterval(() => {
            // @ts-expect-error wrong type
            setIndex((prevIndex: number) => {
                if (prevIndex + 1 >= itemsCount) {
                    return 0;
                }
                const newIndex = prevIndex + 1;
                return newIndex;
            });
        }, 10000); // Change slide every 10 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [itemsCount, setIndex]);

    return (
        <CarouselContent>
            <TotalProductsSold data={data}/>
            <TopSalesCard data={data} />
            
            <SubwaySurfers/>
        </CarouselContent>
    );
};