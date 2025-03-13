"use client";

import Image from "next/image";
import CardWrapper from "./wrapper";


export default function LogoCard() {
    return (
        <CardWrapper className="flex items-center justify-center">
            <Image
                src="/drift-logo.png"
                alt="Drift logo"
                width={500}
                height={500}
            />
        </CardWrapper>
    );
};