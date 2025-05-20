"use client"

import ClientWrapper from "../components/client-wrapper";
import PaymentSuccessful from "../components/display-cards/payment-successful";
import { Purchase } from "../types";
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
      let socketUrl: string;
      if(window.location.hostname == "localhost"){
        socketUrl = `${protocol}://${window.location.hostname}:8001?password=your-secure-password`
      } else {
        socketUrl = `${protocol}://${window.location.hostname}/ws?password=your-secure-password`
      }
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
          let parsedData = JSON.parse(event.data);
          parsedData.timestamp = parsedData.created;
          setPurchases((prevPurchases: any) => [...prevPurchases, parsedData]);
          
          // Show the PaymentSuccessful component for 4 seconds
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
        let url;
        if(window.location.hostname == "localhost"){
          url = "/api/zettle/purchases/local"
        } else {
          url = `/api/zettle/purchases`
        }

        const response = await fetch(`${url}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error("Failed to fetch purchases");
        }

        const data = await response.json();
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
