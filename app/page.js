'use client';
// import Image from "next/image";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { PhotoProvider, usePhoto } from './PhotoContext';

const Openseadragon = dynamic(
  () =>
    import('./OpenSeadragonViewer.js')
)

function HomeContent() {
  const { randomPhoto } = usePhoto();



  const HandleSubmit = async (event) => {
    event.preventDefault();

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
      { randomPhoto &&
        <Openseadragon idPrefix='openseadragon1' />
      }
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

export default function Home() {
  return (
    <PhotoProvider>
      <HomeContent />
    </PhotoProvider>
  );
}
