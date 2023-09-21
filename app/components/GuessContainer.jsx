import Guess from './Guess.jsx';

export default function GuessContainer({ guesses }) {

  guesses.sort((a,b) => a.distance - b.distance);

  return (
    <div className="absolute flex flex-wrap flex-1 flex-row -z-50 justify-center top-20 left-0 items-center min-w-full">
        {guesses.map((guess) => (
            <Guess distance={guess.distance} guess={guess} key={guess.hex} />))
        }
    </div>
  );
}