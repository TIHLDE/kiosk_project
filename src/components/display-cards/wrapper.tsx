"use client";

import { cn } from "@/lib/utils";
import { CarouselItem } from "../motion-primitives/carousel";
import Image from "next/image";


interface CardWrapperProps {
    children: React.ReactNode;
    className?: string;
};


export default function CardWrapper({
    children,
    className,
}: CardWrapperProps) {
    return (
        <CarouselItem
            className="w-screen h-screen p-6"
        >
            <div className={cn("bg-white rounded-xl border border-gray-300 shadow-sm w-full h-full relative", className)}>
                <div className="absolute top-2 right-2">
                    <Image
                        src="/drift-logo.png"
                        alt="Drift logo"
                        width={100}
                        height={100}
                    />
                </div>
                {children}
            </div>
        </CarouselItem>
    );
};