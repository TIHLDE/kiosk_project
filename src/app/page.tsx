import Image from "next/image";
import "./style.css";
import { Metadata } from "next";

{
  /* browser tab name and icon */
}
export const metadata: Metadata = {
  title: "TAFS Statistikk",
  description: "Home page of kiosk.",
  icons: {
    icon: "/drift-logo.png",
  },
};

const clientId = process.env.CLIENT_ID; // Replace with your actual client ID
const apiKey = process.env.CLIENT_SECRET; // Replace with your actual API key

// Prepare the form data
const formData = new URLSearchParams();
formData.append('grant_type', 'urn:ietf:params:oauth:grant-type:jwt-bearer');
formData.append('client_id', clientId!);
formData.append('assertion', apiKey!);

// Make the POST request using fetch
fetch('https://oauth.zettle.com/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: formData.toString(),
})
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch(error => {
    console.error('Error:', error);
  });


{/* 
  
  let json = JSON.read (json fil fra API som henter fra kioskens transaksjoner)

  let products = []
  let dates = []
  
  function fetch(){
  
    hent liste fra API for kiosk transaksjoner
    append hvert element av json.product til products[] og samme for dates[]

  } 

  */}


export default function Home() {
  return (

    <div className="bg-blue-1000 text-white min-h-screen flex flex-col text-center">
      
      <main className="flex flex-col gap-8 ">
        <h1 className="text-10x1">Nyeste kjøp på TAFS</h1>
        <table className="border border-white border-collapse w-full bg-gradient-to-t from-blue-800 to-blue-950">
  <thead>
    <tr>
      <th className="border border-white text-center p-4">Vare</th>
      <th className="border border-white text-center p-4">Klokkeslett</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:40:51</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:39:52</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:38:53</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
    <tr>
      <td className="border border-white text-center p-4">Powerking</td>
      <td className="border border-white text-center p-4">12:29:09</td>
    </tr>
  </tbody>
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
          <p className="self-start">Drift x KoK</p>

        </footer>
      </main>
    </div>

  );
}
