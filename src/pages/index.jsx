import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';

const typeGradientMap = {
  fire: 'bg-gradient-to-br from-yellow-400 to-red-500',
  water: 'bg-gradient-to-br from-blue-400 to-cyan-500',
  grass: 'bg-gradient-to-br from-green-400 to-lime-500',
  electric: 'bg-gradient-to-br from-yellow-300 to-amber-500',
  psychic: 'bg-gradient-to-br from-pink-500 to-purple-500',
  rock: 'bg-gradient-to-br from-gray-500 to-yellow-200',
  ground: 'bg-gradient-to-br from-yellow-600 to-yellow-300',
  bug: 'bg-gradient-to-br from-green-300 to-green-600',
  fairy: 'bg-gradient-to-br from-pink-300 to-pink-600',
  normal: 'bg-gradient-to-br from-gray-300 to-gray-600',
  poison: 'bg-gradient-to-br from-purple-600 to-pink-400',
  ice: 'bg-gradient-to-br from-blue-300 to-teal-200',
  dragon: 'bg-gradient-to-br from-indigo-600 to-blue-300',
  dark: 'bg-gradient-to-br from-gray-700 to-black',
  steel: 'bg-gradient-to-br from-gray-400 to-gray-100',
  ghost: 'bg-gradient-to-br from-gray-800 to-indigo-900',
};

const fetchPokemonBatch = async (offset) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`);
  const data = await res.json();

  const detailPromises = data.results.map((pokemon) =>
    fetch(pokemon.url).then((res) => res.json())
  );
  const detailedPokemons = await Promise.all(detailPromises);

  return detailedPokemons;
};

const PokemonsList = () => {
  const [offset, setOffset] = useState(0);
  const [pokemonList, setPokemonList] = useState([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['pokemon', 'initial'],
    queryFn: () => fetchPokemonBatch(0),
  });

  // Load initial data once it’s available
  useEffect(() => {
    if (data) {
      setPokemonList(data);
    }
  }, [data]);

  const loadMore = async () => {
    setIsLoadingMore(true);
    const newOffset = offset + 20;
    const newBatch = await fetchPokemonBatch(newOffset);
    setPokemonList((prev) => [...prev, ...newBatch]);
    setOffset(newOffset);
    setIsLoadingMore(false);
  };

  if (isLoading) return <p className="text-white">Loading...</p>;
  if (error) return <p className="text-red-400">Error loading Pokémon</p>;

  return (
    <div className="min-h-screen bg-zinc-900 py-10 px-4 md:px-12">
      <h1 className="text-white text-3xl font-bold mb-8 text-center">Pokémon Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pokemonList.map((pokemon) => {
          const primaryType = pokemon.types[0].type.name;
          const gradient = typeGradientMap[primaryType] || 'bg-gradient-to-br from-gray-600 to-gray-800';
          const image = pokemon.sprites.other['official-artwork'].front_default;

          return (
            <Link
              to={`/pokemon/${pokemon.id}`}
              key={pokemon.id}
              className={`rounded-xl p-4 text-white shadow-lg transform hover:scale-105 transition duration-200 ${gradient}`}
            >
              <img
                src={image}
                alt={pokemon.name}
                className="w-32 h-32 object-contain mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold capitalize text-center">{pokemon.name}</h3>
            </Link>
          );
        })}
      </div>

      {/* Load More Button */}
      <div className="mt-10 text-center">
        <button
          onClick={loadMore}
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          disabled={isLoadingMore}
        >
          {isLoadingMore ? 'Loading...' : 'Load More'}
        </button>
      </div>
    </div>
  );
};

export default PokemonsList;
