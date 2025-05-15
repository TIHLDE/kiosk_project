"use client"

import ClientWrapper from "../components/client-wrapper";
import PaymentSuccessful from "../components/display-cards/payment-successful";
import ReloadComponent from "./reload-component";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [purchases, setPurchases] = useState<any>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false); // State to control visibility of PaymentSuccessful
  let pingInterval: NodeJS.Timeout;

  useEffect(() => {
    const connectWebSocket = () => {
      const protocol = window.location.protocol === 'https:' ? 'wss' : 'ws';
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
          const parsedData = JSON.parse(event.data);
          console.log("Purchases: ", purchases);
          setPurchases((prevPurchases: any) => [...prevPurchases, parsedData]);
          

          // Show the PaymentSuccessful component for 5 seconds
          setShowPaymentSuccess(true);
          setTimeout(() => {
            setShowPaymentSuccess(false);
          }, 4000);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected', event);
        clearInterval(pingInterval);
        setTimeout(connectWebSocket, 1000);
      };

      return ws;
    };

    const ws = connectWebSocket();

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    console.log("Purchases: ", purchases);
  }, [purchases])

  useEffect(() => {
    const fetchPurchase = async () => {
      try {
        const response = await fetch(`https://${process.env.NEXT_PUBLIC_URL}/api/zettle/purchases`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch purchases");
        }

        const data = await response.json();
        console.log("From fetch, data.data[0]: ", data.data[0]);
        setPurchases(data.data);
      } catch (error) {
        console.error("Error fetching purchases:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    
    fetchPurchase();
  }, []);

  if (loading) {
    return (
      <div className="bg-black w-full h-screen text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold">Loading...</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-gray-50 flex items-center justify-center h-screen w-full">
      {/* Show PaymentSuccessful component when showPaymentSuccess is true */}
      {showPaymentSuccess && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-opacity-50">
          <PaymentSuccessful />
        </div>
      )}

      {/* Main content */}
      <ReloadComponent />
      <ClientWrapper data={purchases} />
    </div>
  );
}
