'use client';
import Image from "next/image";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { PhotoProvider, usePhoto } from './PhotoContext';

function HomeContent() {
  const { randomPhoto, getPhoto } = usePhoto();
  // score state variable
  const [score, setScore] = useState(0);



  const HandleSubmit = async (event) => {
    event.preventDefault();

    if (event.target.year.value == randomPhoto.year) {
      setScore(score + 100);
    }

    await getPhoto();
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
        <div className="w-1/2 h-1/2">
          <Image src={randomPhoto.edmPreview} alt="Random photograph" layout="responsive" width={200} height={200} />
          <p>{randomPhoto.year}</p>
        </div>
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
      {score > 0 && <p>Your score is: {score}</p>}
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
