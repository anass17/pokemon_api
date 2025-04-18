import { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import {Link} from 'react-router-dom'
import '../App.css'

function PokemonsItem() {
    const [pokemon, setPokemeon] = useState({})
    const [loading, setLoading] = useState(false)
    const {name} = useParams();

    useEffect(() => {
        setLoading(true)
        fetch('https://pokeapi.co/api/v2/pokemon/' + name)
        .then(response => response.json())
        .then(data => {
            setPokemeon(data)
            setLoading(false)
        })
    }, [loading])

    return (
        <>
            <div class="container">
                <div class="pokemon-card">
                    <img className="main-image" src={pokemon.sprites ? pokemon.sprites.versions["generation-v"]["black-white"].animated.front_default : null} alt="Pikachu" />

                    <h2>{pokemon.name}</h2>

                    <div class="pokemon-info">
                        <div class="info-item"><strong>Type:</strong> Electric</div>
                        <div class="info-item"><strong>Height:</strong> {pokemon.height} cm</div>
                        <div class="info-item"><strong>Weight:</strong> {pokemon.weight} kg</div>
                        <div class="info-item"><strong>Abilities:</strong> Static, Lightning Rod</div>
                    </div>

                    <div class="image-gallery">
                        <img src={pokemon?.sprites?.front_default} alt="Pikachu Front" />
                        <img src={pokemon?.sprites?.back_default} alt="Pikachu Side" />
                        <img src={pokemon?.sprites?.front_shiny} alt="Pikachu Back" />
                        <img src={pokemon?.sprites?.back_shiny} alt="Pikachu Back" />
                    </div>

                    <Link to="/">
                        <button class="back-link">Back to Pokémon List</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default PokemonsItem
