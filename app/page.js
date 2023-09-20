"use client";

import Title from "./components/Title";
import SearchResults from "./components/SearchResults";
import GuessContainer from "./components/GuessContainer";
import { useState } from "react";
import Fuse from "fuse.js";
import colors from "../public/colors.json";
import fuseIndex from "../public/fuse-index.json";

export default function Home() {
  const index = Fuse.parseIndex(fuseIndex);
  const trueColor = { name: "Bubblegum Crisis", hex: "#eeccee" };
  const [searchTerm, setSearchTerm] = useState("");
  const [guesses, setGuesses] = useState([]); // [{color: "red", correct: true}, {color: "blue", correct: false}
  const changeSearchTerm = (e) => {
    setSearchTerm(e);
  };
  const guessColor = (color) => {
    console.log(color);
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(colors, options, index);
    var results = fuse.search(searchTerm);
    var guess = results[0].item;
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
    guessColor(searchTerm);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Title />
      <form onSubmit={handleSubmit}>
        <input
          className="border-2 border-gray-300 text-red-950 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none"
          value={searchTerm}
          onChange={(e) => changeSearchTerm(e.target.value)}
          placeholder="Guess a color"
          type="text"
          autoComplete="off"
          enterKeyHint="send"
        />
      </form>
      <GuessContainer guesses={guesses} />
      <SearchResults searchTerm={searchTerm} />
    </main>
  );
}
