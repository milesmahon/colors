export default function Guess({ distance, guess }) {
    
    const size = (.98 ** distance) * 30 + 4; // 30rem is the max size, 5rem is the min size
    
    return (
        <div className="justify-center">
            <div className="flex rounded-full items-center align-center text-center" style={{backgroundColor: `${guess.hex}`, width: `${size}rem`, height: `${size}rem`}}>
                <p className="m-auto">{guess.color}: {distance}</p>
            </div>
        </div>
    )
    }