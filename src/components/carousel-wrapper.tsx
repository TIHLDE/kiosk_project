"use client";

import type { ProductCount } from "@/types";
import { useEffect } from "react";
import { CarouselContent, useCarousel } from "./motion-primitives/carousel";
import TopSalesCard from "./display-cards/top-sales";
import AverageSpentCard from "./display-cards/average-spent";
import EnergyDrinkCard from "./display-cards/energy-drink";


interface CarouselContentWrapperProps {
    data: {
        endDate: Date;
        startDate: Date;
        numberOfPurchases: number;
        averagePayment: number;
        mostSoldProductsByItems: ProductCount[];
        numberOfEnergyDrinksSold: number;
    }
};

export default function CarouselContentWrapper({
    data
}: CarouselContentWrapperProps) {
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
        }, 10000); // Change slide every 2 seconds

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [itemsCount, setIndex]);

    return (
        <CarouselContent>
            <TopSalesCard products={data.mostSoldProductsByItems.slice(0, 11)} />
            <AverageSpentCard averageSpent={data.averagePayment} />
            <EnergyDrinkCard energyDrinks={data.numberOfEnergyDrinksSold} />
        </CarouselContent>
    );
};