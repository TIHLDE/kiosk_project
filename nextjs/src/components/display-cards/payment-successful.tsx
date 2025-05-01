import Image from "next/image";

export default function PaymentSuccessful() {
  return (
      <div
          className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start">
              <h1 className="text-4xl font-bold text-center sm:text-5xl sm:text-middle pt-16">
                  Betaling vellykket
              </h1>
              <div className="Image">
                  <Image
                      src="/check_mark.svg"
                      alt="check_mark_logo"
                      width={180}
                      height={38}
                      priority
                  ></Image>
              </div>
          </main>
      </div>

  );
}