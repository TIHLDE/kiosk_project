"use server"

import ClientWrapper from "../components/client-wrapper";
import ReloadComponent from "./reload-component";
import { getPurchaseStats } from "./server/zettle";

export default async function Home() {
  const data = await getPurchaseStats();

  if (!data) {
    return (
      <div className="bg-black w-full h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">OPS!</h1>
        <p className="text-4xl pt-10">Klarte ikke å hente data</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen w-full">
      <ReloadComponent />
      <ClientWrapper data={data} />
    </div>
  );
}
