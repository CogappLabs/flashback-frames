'use client';
// import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import dynamic from 'next/dynamic';

const Openseadragon = dynamic(
  () =>
    import('./OpenSeadragonViewer.js')
)

export default function Home() {
  const apiKey = process.env.EUROPEANA_API_KEY;
  const [response, setResponse] = useState(null);
  const [randomPhoto, setRandomPhoto] = useState(null);

  const getPhoto = async () => {
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
      const randomPhotoIndex = Math.floor(Math.random() * items.length);
      const randomPhoto = items[randomPhotoIndex];
      const randomPhotoId = items[randomPhotoIndex]['id'];

      // Update the state with the random item
      setRandomPhoto(randomPhoto);


    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Call getPhoto when the component mounts
  useEffect(() => {
    getPhoto();
  }, []);

  const HandleSubmit = async (event) => {
    event.preventDefault();

    getPhoto();

  };

  const [year, setYear] = useState(1860);
  const [minYearText, setMinYearText] = useState(1860);

  const updateYear = (value) => {
    setYear(value);

    console.log(year);

    setMinYearText(value);
  };

  return (
    <div>
      <h1>Guess the Date</h1>
      {randomPhoto && (
        <Openseadragon itemId={randomPhoto.id} idPrefix='openseadragon1' />
      )}
      <h2>When was this photograph taken?</h2>
      <form onSubmit={HandleSubmit}>
        <label htmlFor="year">Year: </label>
        <input 
          className="block mb-4 w-full" 
          type="range" 
          id="year" 
          name="year" 
          min="1860" 
          max="2020" 
          step="1" 
          list="year-markers"         
          value={year}
          onChange={(e) => updateYear(e.target.value)}/>
        <div className="flex justify-between">
          <span id="minYear">{minYearText}</span>
          <span id="maxYear">2020</span>
        </div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit</button>
      </form>
    </div>
  );
}
