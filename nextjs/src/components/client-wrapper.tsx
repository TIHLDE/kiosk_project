"use client";

import type { ProductCount } from "../types";
import { Carousel } from "./motion-primitives/carousel";
import CarouselContentWrapper from "./carousel-wrapper";

interface ClientWrapperProps {
    // data: {
    //     endDate: Date;
    //     startDate: Date;
    //     numberOfPurchases: number;
    //     averagePayment: number;
    //     mostSoldProductsByItems: ProductCount[];
    //     numberOfEnergyDrinksSold: number;
    // }
};

export default function ClientWrapper({
    //@ts-ignore
    data
}) {
    return (
        <div className="w-screen h-screen overflow-hidden">
            <Carousel>
                <CarouselContentWrapper data={data} />
            </Carousel>
        </div>
    );
};