"use client";

import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import LogoCard from "./display-cards/logo";
import type { ProductCount } from "@/types";
import TopSalesCard from "./display-cards/top-sales";
import AverageSpentCard from "./display-cards/average-spent";
import EnergyDrinkCard from "./display-cards/energy-drink";


interface ClientWrapperProps {
    data: {
        endDate: Date;
        startDate: Date;
        numberOfPurchases: number;
        averagePayment: number;
        mostSoldProductsByItems: ProductCount[];
        numberOfEnergyDrinksSold: number;
    }
};

export default function ClientWrapper({
    data
}: ClientWrapperProps) {
    return (
        <InfiniteSlider
            className="w-screen h-screen"
        >
           <LogoCard />
           <TopSalesCard products={data.mostSoldProductsByItems.slice(0, 11)} />
           <LogoCard />
           <AverageSpentCard averageSpent={data.averagePayment} />
           <LogoCard />
           <EnergyDrinkCard energyDrinks={data.numberOfEnergyDrinksSold} />
        </InfiniteSlider>
    );
};