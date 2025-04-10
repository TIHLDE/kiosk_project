"use client";

import type { ProductCount } from "../../types";
import CardWrapper from "./wrapper";
import { Fragment } from "react";

interface TopSalesCardProps {
    products: ProductCount[];
};

export default function TopSalesCard({
    products
}: TopSalesCardProps) {

    return (
        <CardWrapper className="flex items-center justify-center">
            <div className="max-w-5xl w-full mx-auto grid grid-cols-2 gap-24">
                <div className="space-y-2">
                    {products.slice(0, 5).map((product, index) => (
                        <Fragment key={index}>
                            <StepWrapper
                                index={index + 1}
                                title={product.name}
                                amount={product.quantity}
                            />
                            {index !== 4 && <StepDivider />}
                        </Fragment>
                    ))}
                </div>

                <div className="space-y-2">
                    {products.slice(6, 11).map((product, index) => (
                        <Fragment key={index}>
                            <StepWrapper
                                index={index + 6}
                                title={product.name}
                                amount={product.quantity}
                            />
                            {index !== 4 && <StepDivider />}
                        </Fragment>
                    ))}
                </div>
            </div>
        </CardWrapper>
    );
};

interface StepWrapperProps {
    index: number;
    title: string;
    amount: number;
};

function StepWrapper({ index, title, amount }: StepWrapperProps) {
    return (
        <div className="flex items-center space-x-4">
            <div className="flex justify-center items-center shrink-0 bg-gradient-to-br ring-1 shadow-xl rounded-xl w-12 h-12 shadow-blue-500/30 from-sky-300/50 to-blue-300/50 text-blue-500 ring-blue-500/30">
                <p className="text-2xl font-bold">
                    {index}
                </p>
            </div>
            <div className="space-y-1">
                <h1 className="text-2xl font-bold text-sky-900">
                    {title}
                </h1>
                <p className="text-xl text-gray-500 font-medium">
                    {amount.toLocaleString("no-NO")} solgte enheter
                </p>
            </div>
        </div>
    );
};

function StepDivider() {
    return (
        <div className="flex items-center justify-center w-12 h-12">
            <div className="h-10 w-[1px] rounded-lg bg-blue-300" />
        </div>
    );
};