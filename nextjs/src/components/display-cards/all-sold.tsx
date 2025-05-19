import { useEffect, useState } from "react";
import CardWrapper from "./wrapper";
import { Purchase } from "../../types";

export default function TotalProductsSold(props: any) {
    const [purchases, setPurchases] = useState([]);
    useEffect(() => {
        // Fix the timezone offset format by inserting a colon for correct parsing
        const fixTimezone = (ts: string) => ts.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
        const cutoff = new Date("2025-01-01T00:00:00.000+00:00");

        setPurchases(props.data.filter((prop: Purchase) => {const date = new Date(
            fixTimezone(prop.timestamp));
            return date > cutoff;
        }))
    }, [props])

    return (
        <CardWrapper className="py-12">
            <div className="max-w-3xl w-full mx-auto space-y-32">
                <h1 className="text-center text-5xl font-bold text-sky-900">
                    Totale kjøp siden 01.01.2025
                </h1>
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex justify-center items-center shrink-0 bg-gradient-to-br ring-1 shadow-xl rounded-xl w-64 h-64 shadow-blue-500/30 from-sky-300/50 to-blue-300/50 text-blue-500 ring-blue-500/30">
                            <p className="text-5xl font-bold">
                                {purchases.length}
                            </p>
                        </div>
                            
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};