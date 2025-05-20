import { useEffect, useState } from "react";
import CardWrapper from "./wrapper";
import { Purchase } from "../../types";
import { filterPurchasesTo2025 } from "../../lib/utils";

export default function TotalProductsSold({data}: {data: Purchase[]}) {
    const [productsSold, setProductsSold] = useState<number>(0);

    useEffect(() => {
        const filteredData = filterPurchasesTo2025(data);

        setProductsSold(filteredData.reduce((acc, purchase) => acc + purchase.products.length, 0));
    }, [data])

    return (
        <CardWrapper className="py-12">
            <div className="max-w-3xl w-full mx-auto space-y-32">
                <h1 className="text-center text-5xl font-bold text-sky-900">
                    Varer solgt siden 01.01.2025
                </h1>
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex justify-center items-center shrink-0 bg-gradient-to-br ring-1 shadow-xl rounded-xl w-64 h-64 shadow-blue-500/30 from-sky-300/50 to-blue-300/50 text-blue-500 ring-blue-500/30">
                            <p className="text-5xl font-bold">
                                {productsSold}
                            </p>
                        </div>
                            
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};