import ReloadComponent from "./reload-component";
import { getPurchaseStats } from "./server/zettle";
import Image from "next/image";

export default async function Home() {
  const data = await getPurchaseStats();

  if (!data) {
    return (
      <div className="bg-black w-full h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Error</h1>
        <p className="text-4xl pt-10">Failed to fetch data</p>
      </div>
    );
  }

  return (
    <div>
      {/* <ReloadComponent /> */}
      <div className="bg-gradient-to-bl from-gray-100 to-gray-300 w-full h-screen text-white grid grid-cols-2 grid-rows-2 gap-4 p-4 justify-center">
        <div className="bg-gray-100 flex-box p-12 min-w-60 min-h-30 text-black flex flex-col items-center justify-center rounded-xl">
          {data ? (
            <div className="w-40 h-40 flex justify-center items-center rounded-full border-2 border-sky-700 shadow-md">
              <p className="text-3xl font-bold">{data.averagePayment},-</p>
            </div>
          ) : (
            <div className="text-4xl pt-10">
              <p>Loading...</p>
            </div>
          )}
          <h1 className="text-2xl font-bold pt-10 text-center">
            Gjennomsnittlig betalingsbeløp siste {data?.numberOfPurchases}{" "}
            betalinger ({formatDate(data?.startDate || new Date())} -{" "}
            {formatDate(data?.endDate || new Date())})
          </h1>
        </div>
        <div className="bg-gray-100 flex-box p-12 text-black flex flex-col justify-center rounded-xl space-y-4">
          <h1 className="text-2xl font-bold">
            Mest solgte produkter siste {data?.numberOfPurchases} betalinger
          </h1>
          {data ? (
            <div className="grid grid-cols-3 gap-3">
              {data.mostSoldProductsByItems
                .slice(0, 9)
                .map((product, index) => (
                  <div
                    className="space-y-1 border-2 border-sky-700 rounded-lg p-2"
                    key={index}
                  >
                    <p className="text-center font-semibold text-xl">
                      {product.quantity}
                    </p>
                    <p className="text-center">{product.name.slice(0, 20)}</p>
                  </div>
                ))}
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
        </div>
        <div className="bg-gray-100 flex-box p-12 text-black flex flex-col items-center justify-center rounded-xl space-y-4">
          <Image
            src="/drift-logo.png"
            alt="Zettle logo"
            width={500}
            height={500}
          />
        </div>
        <div className="bg-gray-100 flex-box p-12 min-w-60 min-h-30 text-black flex flex-col items-center justify-center rounded-xl">
          {data ? (
            <div className="w-40 h-40 flex justify-center items-center rounded-full border-2 border-sky-700 shadow-md">
              <p className="text-3xl font-bold">
                {" "}
                {data.numberOfEnergyDrinksSold}
              </p>
            </div>
          ) : (
            <div>
              <p>Loading...</p>
            </div>
          )}
          <h1 className="text-2xl font-bold pt-10">
            Antall energidrikker solgt siste {data?.numberOfPurchases}{" "}
            betalinger
          </h1>
        </div>
      </div>
    </div>
  );
}

function formatDate(date: Date): string {
  const dateObject = new Date(date);
  return `${dateObject.getDate().toString()}.${(
    dateObject.getMonth() + 1
  ).toString()}.${dateObject.getFullYear().toString()}`;
}
