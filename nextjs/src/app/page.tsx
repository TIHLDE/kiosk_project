"use client"

import ClientWrapper from "../components/client-wrapper";
import ReloadComponent from "./reload-component";
import { getAccessToken } from "./server/token";
import { getPurchaseStats, fetchPurchases } from "./server/zettle";
import React, { useState, useEffect } from "react";

export default function Home() {
  
  const [purchases, setPurchases] = useState<string[]>([]);
  let pingInterval: NodeJS.Timeout;

  useEffect(() => {

    const connectWebSocket = () => {
      // Velg riktig WebSocket-protokoll basert på om siden er lastet inn over HTTPS eller HTTP
      // Hvis siden er lastet inn over HTTPS, bruk WSS (WebSocket Secure)
      // Ellers bruk WS (WebSocket)
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
      // Her må du bruke riktig port og passord for WebSocket-serveren
      // Pass på at porten er den samme som serveren din kjører på
      // og at passordet er det samme som du bruker i serverkoden
      const socketUrl = `${protocol}://${window.location.hostname}/ws?password=your-secure-password`;
      const ws = new WebSocket(socketUrl);

      ws.onopen = () => {
        console.log('WebSocket connected');

        pingInterval = setInterval(() => {
          if (ws.readyState === WebSocket.OPEN) {
            console.log("Sending ping...");
            ws.send("ping");
          }
        }, 30000);
      };

      ws.onmessage = (event: MessageEvent) => {
        console.log('Message received:', event.data);

        if (event.data === "pong") {
          console.log("Pong received, connection is alive");
        } else {
          setPurchases((prevMessages) => [...prevMessages, event.data]);
        }

      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected', event);
        clearInterval(pingInterval);
        
        setTimeout(connectWebSocket, 1000);
      }

      return ws;
    }

    const ws = connectWebSocket();

    // Lukk WebSocket-tilkoblingen når komponenten avmonteres
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    const fetchPurchase = async () => {
      const response = await fetch('https://dev-kiosken.tihlde.org/api/zettle/purchases', {
        method:'GET'
      });

      const data = await response.json();

      setPurchases(data);
    }
    fetchPurchase();
  }, [])

  // if (!response) {
  //   return (
  //     <div className="bg-black w-full h-screen text-white flex flex-col items-center justify-center">
  //       <h1 className="text-2xl font-bold">OPS!</h1>
  //       <p className="text-4xl pt-10">Klarte ikke å hente data</p>
  //     </div>
  //   );
  // }

  return (
    <div className="bg-gray-50 flex items-center justify-center h-screen w-full">
      <ReloadComponent />
      <ClientWrapper data={purchases} />
    </div>
  );
}
