'use client'

export default function page(){

  const addSubscription = async () => {
    const response = await fetch("https://dev-kiosken.tihlde.org/subscriptions/add");

    console.log(response);
  }

  return(
    <div>
      <button onClick={addSubscription}>Add Subscription</button>
    </div>
  )
}