import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

const typeColorMap = {
  fire: 'bg-red-400',
  water: 'bg-blue-400',
  grass: 'bg-green-400',
  electric: 'bg-yellow-400',
  psychic: 'bg-pink-400',
  rock: 'bg-yellow-200',
  ground: 'bg-yellow-300',
  bug: 'bg-green-600',
  fairy: 'bg-pink-300',
  normal: 'bg-gray-400',
  poison: 'bg-purple-400',
  ice: 'bg-teal-300',
  dragon: 'bg-indigo-400',
  dark: 'bg-gray-600',
  steel: 'bg-gray-300',
  ghost: 'bg-indigo-500',
};

const fetchPokemon = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (!res.ok) throw new Error('Failed to fetch Pokémon data');
  return res.json();
};

const PokemonDetails = () => {
  const { id } = useParams();

  const { data: pokemon, isLoading, error } = useQuery({
    queryKey: ['pokemon', id],
    queryFn: () => fetchPokemon(id),
  });

  if (isLoading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (error) return <div className="text-red-400 text-center mt-20">Failed to load Pokémon.</div>;

  const image = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <>
        <div className="min-h-screen bg-zinc-900 text-white py-10 px-4 md:px-12">
            <div className="max-w-3xl mx-auto bg-zinc-800 p-6 rounded-lg shadow-lg">
                <div className="flex flex-col items-center">
                    <img src={image} alt={pokemon.name} className="w-48 h-48 mb-4" />
                    <h1 className="text-4xl font-bold capitalize mb-2">{pokemon.name}</h1>
                    <div className="flex gap-3 mb-4">
                        {pokemon.types.map((t) => (
                        <span
                            key={t.type.name}
                            className={`px-5 py-1.5 pb-2 capitalize rounded-sm border text-white border-transparent text-sm font-semibold ${typeColorMap[t.type.name] || 'bg-gray-500'}`}
                        >
                            {t.type.name}
                        </span>
                        ))}
                    </div>
                </div>

                <div className='flex justify-evenly py-10'>
                    <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_default} alt="" />
                    <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.back_default} alt="" />
                    <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.front_shiny} alt="" />
                    <img src={pokemon.sprites.versions['generation-v']['black-white'].animated.back_shiny} alt="" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                <div>
                    <p className="text-gray-400">Height</p>
                    <p>{pokemon.height / 10} m</p>
                </div>
                <div>
                    <p className="text-gray-400">Weight</p>
                    <p>{pokemon.weight / 10} kg</p>
                </div>
                <div className="col-span-2">
                    <p className="text-gray-400 mb-1">Abilities</p>
                    <ul className="list-disc list-inside">
                    {pokemon.abilities.map((a) => (
                        <li key={a.ability.name}>{a.ability.name}</li>
                    ))}
                    </ul>
                </div>
                </div>

                <div className="mt-8">
                <p className="text-gray-400 mb-2">Stats</p>
                <div className="space-y-2">
                    {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                        <p className="capitalize">{stat.stat.name}: {stat.base_stat}%</p>
                        <div className="w-full bg-gray-700 h-2 rounded">
                        <div
                            className="bg-green-400 h-2 rounded"
                            style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
                        />
                        </div>
                    </div>
                    ))}
                </div>
                </div>
            </div>
        </div>
        <Link to="/" className='absolute top-5 left-4 bg-gray-800 hover:bg-gray-700 transition cursor-pointer px-4 py-2 rounded-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" fill='#FFF' width={20} viewBox="0 0 448 512">
                {/* <!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--> */}
                <path d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/>
            </svg>
        </Link>
    </>
  );
};

export default PokemonDetails;
