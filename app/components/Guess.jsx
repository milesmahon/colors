export default function Guess({ distance, guess }) {
    const size = 2 + (600 - distance) / 50;
    if (size < 50)
    return (
        <div className="justify-center">
            <div className="flex rounded-full items-center align-center text-center" style={{backgroundColor: `${guess.hex}`, width: `${size}rem`, height: `${size}rem`}}>
                <p className="m-auto">{guess.color}: {distance}</p>
            </div>
        </div>
    )
    }