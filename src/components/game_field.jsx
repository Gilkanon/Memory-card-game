import Card from './card.jsx'
import {useEffect, useState} from "react";

const apiUrls = [
    'https://pokeapi.co/api/v2/pokemon/3',
    'https://pokeapi.co/api/v2/pokemon/9',
    'https://pokeapi.co/api/v2/pokemon/6',
    'https://pokeapi.co/api/v2/pokemon/12',
    'https://pokeapi.co/api/v2/pokemon/55',
    'https://pokeapi.co/api/v2/pokemon/34',
    'https://pokeapi.co/api/v2/pokemon/78',
    'https://pokeapi.co/api/v2/pokemon/53',
    'https://pokeapi.co/api/v2/pokemon/15',
    'https://pokeapi.co/api/v2/pokemon/22',
    'https://pokeapi.co/api/v2/pokemon/68',
    'https://pokeapi.co/api/v2/pokemon/89',
]

function shuffleArray(array) {
    // Проходим по массиву с конца к началу
    for (let i = array.length - 1; i > 0; i--) {
        // Получаем случайный индекс от 0 до i
        const j = Math.floor(Math.random() * (i + 1));

        // Меняем местами элементы с индексами i и j
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array; // Возвращаем перемешанный массив
}

export default function GameField () {
    const [score, setScore] = useState(0);
    const [pokemons, setPokemons] = useState([]);
    const [isClicked, setIsClicked] = useState([]);
    const [highScore, setHighScore] = useState(0);
    const isWin = score === 12 ? true : false;


    useEffect(() => {
        async function fetchData() {
            const res = await Promise.all(
                apiUrls.map(async url => {
                    const response = await fetch(url);
                    const data = await response.json();
                    return {
                        id: data.id,
                        name: data.name,
                        sprite: data.sprites.other.dream_world.front_default
                    }
                })
            );
            setPokemons(shuffleArray(res));
        }
        fetchData();
    }, []);

    function handleClickOnPokemon(name) {
        if (isClicked.includes(name)) {
            setScore(0);
            setIsClicked([]);
            setPokemons(shuffleArray(pokemons));
        } else {
            if (score >= highScore) {
                setHighScore(highScore + 1);
            }
            setScore(score + 1);
            setIsClicked([...isClicked, name]);
            setPokemons(shuffleArray(pokemons));
        }
    }

    return (
        <div className="game-field">
            <h1>Score: {score} High score: {highScore}</h1>
            {isWin ?
                <div>
                    <h1>You win</h1>
                    <button onClick={() => window.location.reload()}>Play again</button>
                </div> :
                <div className='cards'>
                        {pokemons.map(pokemon => <Card key={pokemon.id} name={pokemon.name} sprite={pokemon.sprite} handleClick={handleClickOnPokemon}/>)}
                </div>
            }
        </div>
    )
}