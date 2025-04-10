import Image from "next/image";

export default function paymentPendingPage() {
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gradient-to-bl from-gray-100 to-gray-400">
            <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
                <div className="flex flex-row items-center gap-4 pt-16">
                    <h1 className="text-4xl font-bold text-center sm:text-5xl sm:text-middle">
                        Betaling pågår
                    </h1>
                    <div className="animate-spin">
                        <Image
                            src="/loading_icon.svg"
                            alt="spinner_logo"
                            width={50}
                            height={50}
                            priority
                        />
                    </div>
                </div>
            </main>
        </div>
    );
}