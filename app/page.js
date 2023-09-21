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
  trueColor.lab = hex2lab(trueColor.hex);
  const [searchTerm, setSearchTerm] = useState("");
  const [guesses, setGuesses] = useState([]); // [{color: "red", correct: true}, {color: "blue", correct: false}

  const changeSearchTerm = (e) => {
    setSearchTerm(e);
  };

  // https://github.com/antimatter15/rgb-lab/tree/master
  function hex2lab(hex) {
    hex = hex.replace("#", "");

    // Convert the red, green, and blue components from hex to decimal
    // you can substring instead of slice as well
    var r = parseInt(hex.slice(0, 2), 16) / 255;
    var g = parseInt(hex.slice(2, 4), 16) / 255;
    var b = parseInt(hex.slice(4, 6), 16) / 255;

    var x, y, z;

    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.0;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;

    return { l: 116 * y - 16, a: 500 * (x - y), b: 200 * (y - z) };
  }

  const guessColor = () => {
    const options = {
      keys: ["name"],
    };
    const fuse = new Fuse(colors, options, index);
    var results = fuse.search(searchTerm);
    var guess = results[0].item;
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
    const guessLab = hex2lab(guess.hex);

    const trueLab = trueColor.lab;

    const distance = Math.sqrt(
      Math.pow(guessLab.l - trueLab.l, 2) +
        Math.pow(guessLab.a - trueLab.a, 2) +
        Math.pow(guessLab.b - trueLab.b, 2)
    );
    return Math.floor(distance);
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
