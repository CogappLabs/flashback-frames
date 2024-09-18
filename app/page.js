'use client';
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomItemId, setRandomItemId] = useState(null);

  const HandleButtonClick = async () => {
    try {
      // Make the GET request to the API
      const res = await fetch(`/api`, {
        headers: {
          "Authorization": `Bearer ${apiKey}`,
        },
      });

      // Check if the response is ok
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse the JSON response
      const data = await res.json();

      // Update the state with the response data
      setResponse(data);

      // Access a random item from the items array
      const items = data.data.items;
      const randomItemIndex = Math.floor(Math.random() * items.length);
      const randomItem = items[randomItemIndex];
      const randomItemId = items[randomItemIndex]['id'];

      // Update the state with the random item
      setRandomItemId(randomItemId);

      console.log(randomItem);

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h1>Fictional Family Tree</h1>
      <p>This is Name, they are from Country</p>
      <Image src="/unknown-person.jpg" alt="Unknown person" width={250} height={250} />
      <h2>You decide:</h2>
      <p>Did Name live in Country their whole life or did they emigrate?</p>
      <button onClick={HandleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Stayed</button>
      <button onClick={HandleButtonClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Emigrated</button>
    </div>
  );
}
