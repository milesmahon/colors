import Guess from './Guess.jsx';

export default function GuessContainer({ guesses }) {

  guesses.sort((a,b) => a.distance - b.distance);

  return (
    <div>
        {guesses.map((guess) => (
            <Guess distance={guess.distance} guess={guess} key={guess.hex} />))
        }
    </div>
  );
}