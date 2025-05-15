import Image from "next/image";
import CardWrapper from "./wrapper";

export default function PaymentSuccessful() {
  return (
    <div
      className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-50"
    >
        <main className="flex flex-col items-center gap-8 row-start-2 bg-transparent  p-12 rounded-lg sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-5xl sm:text-middle pt-4">
          Betaling vellykket
        </h1>
        <div className="flex justify-center items-center h-full w-full">
          <Image
            src="/check_mark.svg"
            alt="check_mark_logo"
            width={180}
            height={38}
            priority
          />
        </div>
      </main>
    </div>
  );
}