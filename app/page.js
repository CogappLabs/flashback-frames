'use client';
import { useState } from "react";
import { PhotoProvider, usePhoto } from './PhotoContext';

function HomeContent() {
  const { randomPhoto, getPhoto, revealYear, setRevealYear } = usePhoto();
  const [score, setScore] = useState(0);
  const [turnsRemaining, setTurnsRemaining] = useState(5);
  const [userAnswer, setUserAnswer] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);

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
    setShowNextButton(true);

    if (turnsRemaining <= 1) {
      return;
    }
  };

  const handleNext = async () => {
    if (turnsRemaining === 0) {
      return;
    }
    
    await getPhoto();
    setRevealYear(false);
    setShowNextButton(false); // Hide the "Next" button after fetching a new photo
  };

  const [year, setYear] = useState(1880);
  const [minYearText, setMinYearText] = useState(1880);

  const updateYear = (value) => {
    setYear(value);
    setMinYearText(value);
  };

  return (
    <div className="container flex flex-col items-center p-8">
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Guess the Date</h1>
      { randomPhoto &&
        <div className="w-1/2 h-96 flex mb-8">
          <img className="object-contain w-full" src={randomPhoto.edmPreview} alt="Random photograph" layout="responsive" />
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
            min="1880" 
            max="2020" 
            step="1" 
            list="year-markers"         
            value={year}
            onChange={(e) => updateYear(e.target.value)}/>
          <div className="flex justify-between mb-4">
            <span id="minYear">{minYearText}</span>
            <span id="maxYear">2020</span>
          </div>
          {!showNextButton && (
            <button className={ turnsRemaining === 0 ? "bg-blue-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>Submit</button>
          )}
          {showNextButton && (
            <button onClick={handleNext} className={ turnsRemaining === 0 ? "bg-green-500 text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed" : "mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"}>
              Next
            </button>
          )}
        </form>
        <p className="mb-4 text-xl"><span className="font-bold">{turnsRemaining == 0 ? 'Game over! Your final score is:' : 'Your score is:'}</span> {score} / 500</p>
        <p className="mb-4"><span className="font-bold">Turns remaining:</span> {turnsRemaining}</p>
        <p className="mb-4">
          <span className="font-bold">Your answer:</span>
          { revealYear && <span className="rounded border-solid border-2 border-sky-500 p-2">{ userAnswer }</span> }
        </p>
        <p className="mb-4">
          <span className="font-bold">The correct answer:</span>
          { revealYear && <span className="rounded border-solid border-2 border-sky-500 p-2">{ randomPhoto.year }</span> }
        </p>
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
