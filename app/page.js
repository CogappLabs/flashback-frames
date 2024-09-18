'use client';
// import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';

const Openseadragon = dynamic(
  () =>
    import('./OpenSeadragonViewer.js')
)

export default function Home() {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomPerson, setRandomPerson] = useState(null);

  const getPerson = async () => {
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
      const randomPersonIndex = Math.floor(Math.random() * items.length);
      const randomPerson = items[randomPersonIndex];
      const randomPersonId = items[randomPersonIndex]['id'];

      // Update the state with the random item
      setRandomPerson(randomPerson);


    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Call getPerson when the component mounts
  useEffect(() => {
    getPerson();
  }, []);

  const HandleSubmit = async (event) => {
    event.preventDefault();

    getPerson();

  };

  return (
    <div>
      <h1>Fictional Family Tree</h1>
      <p>This is Name, they are from {randomPerson && randomPerson.country[0]}</p>
      {/* <Image src="/unknown-person.jpg" alt="Unknown person" width={250} height={250} /> */}
      {randomPerson && (
        <Openseadragon itemId={randomPerson.id} idPrefix='openseadragon1' />
      )}
      <h2>You decide:</h2>
      <form onSubmit={HandleSubmit}>
        <p>Did Name live in {randomPerson && randomPerson.country[0]} their whole life or did they emigrate?</p>
        
        {/* Radio button field with Stayed or Emigrated */}
        <input type="radio" id="stayed" name="stay" value="stayed" />
        <label for="stayed">Stayed</label>
        <input type="radio" id="emigrated" name="stay" value="emigrated" />
        <label for="emigrated">Emigrated</label>

        <p>How many children did they have?</p>
        {/* Radio button with 1 - 3 */}
        <input type="radio" id="one" name="children" value="one" />
        <label for="one">1</label>
        <input type="radio" id="two" name="children" value="two" />
        <label for="two">2</label>
        <input type="radio" id="three" name="children" value="three" />
        <label for="three">3</label>

        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}
