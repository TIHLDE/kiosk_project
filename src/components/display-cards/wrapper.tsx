"use client";

import { cn } from "@/lib/utils";


interface CardWrapperProps {
    children: React.ReactNode;
    className?: string;
};


export default function CardWrapper({
    children,
    className
}: CardWrapperProps) {
    return (
        <div
            className="w-screen h-screen py-6"
        >
            <div className={cn("bg-white rounded-xl border shadow-sm w-full h-full", className)}>
                {children}
            </div>
        </div>
    );
};