'use client'

import { useEffect, useState } from "react";
import { subscription } from "../../types";

export default function Page() {
  const [subscriptions, setSubscriptions] = useState<subscription[]>([]);
  const [selectedSubscriptions, setSelectedSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    getSubscriptions();
  }, []);

  const addSubscription = async () => {
    const response = await fetch(`https://${process.env.NEXT_PUBLIC_URL}/api/subscriptions/add`);
    console.log(response);
  };

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_URL}/api/subscriptions/get`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        throw new Error("Failed to fetch subscriptions");
      }
  
      const data = await response.json();
      setSubscriptions(data.data);
    } catch (error) {
      console.error("Error fetching subscriptions:", error);
      alert("Failed to fetch subscriptions. Please try again later.");
    }
  };

  const handleCheckboxChange = (uuid: string) => {
    setSelectedSubscriptions((prev) =>
      prev.includes(uuid)
        ? prev.filter((id) => id !== uuid) // Remove if already selected
        : [...prev, uuid] // Add if not selected
    );
  };

  const deleteSelectedSubscriptions = async () => {
    if (selectedSubscriptions.length === 0) {
      alert("No subscriptions selected for deletion.");
      return;
    }

    const confirmDelete = confirm(
      `Are you sure you want to delete ${selectedSubscriptions.length} subscription(s)?`
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_URL}/api/subscriptions/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionIds: selectedSubscriptions }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete subscriptions");
      }

      // Remove deleted subscriptions from the list
      setSubscriptions((prev) =>
        prev.filter((subscription) => !selectedSubscriptions.includes(subscription.uuid))
      );

      // Clear the selected subscriptions
      setSelectedSubscriptions([]);
      alert("Selected subscriptions deleted successfully.");
    } catch (error) {
      console.error("Error deleting subscriptions:", error);
      alert("Failed to delete subscriptions.");
    }
  };

  return (
    <>
      <div className="flex justify-center items-center bg-gray-100">
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={addSubscription}
        >
          Add Subscription
        </button>
      </div>

      <div className="p-8 bg-gray-50">
        <h1 className="text-3xl font-bold text-center mb-8">Subscriptions</h1>
        <div className="flex justify-end mb-4">
          <button
            className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={deleteSelectedSubscriptions}
          >
            Delete Selected
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((subscription) => (
            <div
              key={subscription.uuid}
              className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
            >
              <h2 className="text-xl font-bold text-blue-600 mb-4 flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={selectedSubscriptions.includes(subscription.uuid)}
                  onChange={() => handleCheckboxChange(subscription.uuid)}
                />
                Subscription ID: {subscription.uuid}
              </h2>
              <p>
                <span className="font-semibold">Transport Name:</span> {subscription.transportName}
              </p>
              <p>
                <span className="font-semibold">Event Names:</span> {subscription.eventNames.join(", ")}
              </p>
              <p>
                <span className="font-semibold">Updated:</span> {new Date(subscription.updated).toLocaleString()}
              </p>
              <p>
                <span className="font-semibold">Destination:</span> {subscription.destination}
              </p>
              <p>
                <span className="font-semibold">Contact Email:</span> {subscription.contactEmail}
              </p>
              <p>
                <span className="font-semibold">Status:</span> {subscription.status}
              </p>
              <p>
                <span className="font-semibold">Signing Key:</span> {subscription.signingKey}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}