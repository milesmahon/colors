export default function Guess({ distance, guess }) {
    return (
        <div className="justify-center">
            <p style={{color: `${guess.hex}`}}>{guess.color}: {distance}</p>
        </div>
    )
    }