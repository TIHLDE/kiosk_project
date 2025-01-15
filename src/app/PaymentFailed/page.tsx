import Image from "next/image";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: "Payment Failed",
    description: "",
    icons: {
      icon: "/drift-logo.png",
    },
  };

export default function paymentPendingPage() {

return (

    
<div
          className="bg-red-600 grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-green-1000">
          <main className="flex flex-row gap-8 row-start-2 items-center sm:items-start ">
              <h1 className="text-4xl font-bold text-center sm:text-5xl sm:text-middle pt-16">
                  Betaling mislykket
              </h1>
              <div className="Image">
                  <Image
                      src="/squidward.png"
                      alt="check_mark_logo"
                      width={180}
                      height={38}
                      priority
                  ></Image>
              </div>
          </main>
    
      </div>
)
};