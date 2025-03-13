import CardWrapper from "./wrapper";


interface AverageSpentProps {
    averageSpent: number;
};

export default function AverageSpentCard({
    averageSpent,
}: AverageSpentProps) {
    return (
        <CardWrapper className="py-12">
            <div className="max-w-3xl w-full mx-auto space-y-32">
                <h1 className="text-center text-5xl font-bold text-sky-900">
                    Gjennomsnittlig betalingsbeløp
                </h1>
                <div className="flex items-center justify-center">
                    <div className="flex items-center space-x-4">
                        <div className="flex justify-center items-center shrink-0 bg-gradient-to-br ring-1 shadow-xl rounded-xl w-64 h-64 shadow-blue-500/30 from-sky-300/50 to-blue-300/50 text-blue-500 ring-blue-500/30">
                            <p className="text-5xl font-bold">
                                {averageSpent},-
                            </p>
                        </div>
                            
                    </div>
                </div>
            </div>
        </CardWrapper>
    );
};