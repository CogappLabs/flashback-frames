'use client';
import Image from "next/image";
import { useState } from "react";
import dynamic from 'next/dynamic';
import { PhotoProvider, usePhoto } from './PhotoContext';

function HomeContent() {
  const { randomPhoto, getPhoto, revealYear, setRevealYear } = usePhoto();
  // score state variable
  const [score, setScore] = useState(0);
  const [turnsRemaining, setTurnsRemaining] = useState(5);
  const [userAnswer, setUserAnswer] = useState(0);




  const HandleSubmit = async (event) => {
    event.preventDefault();

    if (turnsRemaining === 0) {
      return;
    }

    if (event.target.year.value == randomPhoto.year) {
      setScore(score + 100);
    } else {
      const yearDifference = Math.abs(event.target.year.value - randomPhoto.year);
      const deductedScore = 100 - (yearDifference * 5);
      const finalScore = Math.max(deductedScore, 0); // Ensure the score doesn't go below 0
      setScore(score + finalScore);
    }

    setTurnsRemaining(turnsRemaining - 1);

    setRevealYear(true);
    setUserAnswer(event.target.year.value);

    if (turnsRemaining <= 1) {
      return;
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
    <div className="container flex flex-col items-center p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Guess the Date</h1>
      { randomPhoto &&
        <div className="w-1/2 h-96 flex mb-8">
          <Image className="object-contain" src={randomPhoto.edmPreview} alt="Random photograph" layout="responsive" width={200} height={200} />
        </div>
      }
      <div className="w-1/2">
        <h2 className="mb-4">When was this photograph taken?</h2>
        <form className="mb-8" onSubmit={HandleSubmit}>
          <label className="font-bold" htmlFor="year">Year: </label>
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
          <div className="flex justify-between mb-4">
            <span id="minYear">{minYearText}</span>
            <span id="maxYear">2020</span>
          </div>
          <button className={ turnsRemaining === 0 ? "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit</button>
        </form>
        <p className="mb-4">
          <span className="font-bold">Your answer:</span>
          { revealYear && <span className="rounded border-solid border-2 border-sky-500 p-2">{ userAnswer }</span> }
        </p>
        <p className="mb-4">
          <span className="font-bold">The correct answer:</span>
          { revealYear && <span className="rounded border-solid border-2 border-sky-500 p-2">{ randomPhoto.year }</span> }
        </p>
        <p className="mb-4"><span className="font-bold">Your score is:</span> {score} / 500</p>
        <p><span className="font-bold">Turns remaining:</span> {turnsRemaining}</p>
      </div>
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
