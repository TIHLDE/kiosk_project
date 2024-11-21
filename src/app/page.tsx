import Image from "next/image";
import "./style.css";
import { Metadata } from "next";

{
  /* browser tab name and icon */
}
export const metadata: Metadata = {
  title: "TAFS Statistikk",
  description: "The official Coding Beauty home page.",
  icons: {
    icon: "/drift-logo.png",
  },
};

export default function Home() {
  return (
    <div className="bg-blue-1000 text-white min-h-screen flex flex-col">
      
      <main className="flex flex-col gap-8 ">
        <h1 className="text-20xl">TAFS Statistikk</h1>

        <h2 className="text-3x1">Topp 10 denne måneden</h2>
        <table className="border border-white border-collapse w-1/4">
          <tr>
            <th className="border 1px solid white">Vare</th>
            <th className="border 1px solid white">Antall solgt</th>
          </tr>
          <tr>
            <td className="border 1px solid white">Powerking</td>
            <td className="border 1px solid white">200</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Nudler</td>
            <td className="border 1px solid white">128</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Toast</td>
            <td className="border 1px solid white">70</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
          <tr>
            <td className="border 1px solid white">Mellombar</td>
            <td className="border 1px solid white">54</td>
          </tr>
        </table>

        <footer className="absolute bg-blue-1100 bottom-0 p-8 w-full h-60 flex flex-col items-center justify-center">
          <Image
            className="bg-white self-start"
            src="/drift-logo.png"
            alt="Drift logo"
            width={200}
            height={38}
            priority
          />
          <p className="self-start">Drift</p>
          <p className="text-center mt-4">
            Vil du se mer statistikk? Kontakt Mathias
          </p>
        </footer>
      </main>
    </div>
  );
}
