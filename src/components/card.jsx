export default function Card ({name, sprite, handleClick}) {
    return (
        <div
            className="card"
            onClick={() => handleClick(name)}
        >
            <img src={sprite} alt={name}/>
            <h2>{name}</h2>
        </div>
    )
}