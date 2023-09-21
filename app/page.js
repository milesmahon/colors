"use client";

import Title from "./components/Title";
import SearchResults from "./components/SearchResults";
import GuessContainer from "./components/GuessContainer";
import { useState } from "react";
import Fuse from "fuse.js";
import colors from "../public/colors.json";
import fuseIndex from "../public/fuse-index.json";
import confetti from "canvas-confetti";

export default function Home() {
  const index = Fuse.parseIndex(fuseIndex);
  const trueColor = colors[Math.floor(Math.random() * colors.length)];
  const [searchTerm, setSearchTerm] = useState("");
  const [guesses, setGuesses] = useState([]); // [{color: "red", correct: true}, {color: "blue", correct: false}
  const changeSearchTerm = (e) => {
    setSearchTerm(e);
  };
  const guessColor = () => {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(colors, options, index);
    var results = fuse.search(searchTerm);
    var guess = results[0].item;
    console.log(guesses);
    if (guesses.some((g) => g.color === guess.name)) {
      return;
    }
    var distance = compareToTrueColor(guess);

    setGuesses([
      ...guesses,
      {
        color: guess.name,
        hex: guess.hex,
        // correct: color.name.toLowerCase === searchTerm.toLowerCase(),
        distance: distance,
      },
    ]);
    setSearchTerm("");
    if (distance == 0) {
      confetti();
    }
  };

  const compareToTrueColor = (guess) => {
    const guessRGB = hexToRGB(guess.hex);
    const trueRGB = hexToRGB(trueColor.hex);
    const distance = Math.sqrt(
      Math.pow(guessRGB.r - trueRGB.r, 2) +
        Math.pow(guessRGB.g - trueRGB.g, 2) +
        Math.pow(guessRGB.b - trueRGB.b, 2)
    );
    return Math.floor(distance);
  };

  const hexToRGB = (hex) => {
    // Remove the # character from the beginning of the hex code
    hex = hex.replace("#", "");

    // Convert the red, green, and blue components from hex to decimal
    // you can substring instead of slice as well
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // Return the RGB value as an object with properties r, g, and b
    return { r, g, b };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    guessColor();
  };

  return (
    <main className="mt-60 m-12 min-h-screen overflow-hidden">
      <GuessContainer guesses={guesses} />
      <Title />
      <div className="text-center z-50">
        <form className="mt-10 opacity-90" onSubmit={handleSubmit}>
          <input
            className="text-center w-56 h-10 px-5 rounded-lg text-sm focus:outline-none bg-slate-800 text-gray-400 placeholder:text-gray-600"
            value={searchTerm}
            onChange={(e) => changeSearchTerm(e.target.value)}
            placeholder="Guess a color"
            type="text"
            autoComplete="off"
            enterKeyHint="send"
          />
        </form>
        <div className="justify-center align-center m-auto text-center mx-auto w-56">
          <SearchResults searchTerm={searchTerm} />
        </div>
      </div>
    </main>
  );
}
