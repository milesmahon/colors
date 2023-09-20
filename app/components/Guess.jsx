export default function Guess({ distance, guess }) {
    return (
        <div className="text-red justify-center">
            <p style={{color: `${guess.hex}`}}>{guess.color}: {distance}</p>
        </div>
    )
    }