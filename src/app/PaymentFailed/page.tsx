import Image from "next/image";

export default function failedPaymentPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-bl from-red-400 to-red-600">
            <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
                <div className="flex flex-row items-center gap-4">
                    <h1 className="text-4xl font-bold text-center sm:text-5xl sm:text-middle">
                        Betaling mislyktes
                    </h1>
                    <div className="Image">
                        <Image
                            src="/error_icon.svg"
                            alt="error_icon"
                            width={120}
                            height={26}
                            priority
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}