'use client'

export default function page(){

  const addSubscription = async () => {
    const response = await fetch("https://dev-kiosken.tihlde.org/api/subscriptions/add");

    console.log(response);
  }

  const getSubscriptions = async () => {
    const response = await fetch("https://dev-kiosken.tihlde.org/api/subscriptions/get", {
      method:'GET'
    });

    console.log(response);
  }

  return(
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={addSubscription}>Add Subscription</button>
      <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={getSubscriptions}>Get Subscriptions</button>
    </div>
  )
}