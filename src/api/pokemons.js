export const fetchPokemons = async () => {
    const res = await fetch('https://pokeapi.co/api/v2/pokemon');
    if (!res.ok) throw new Error('Network response was not ok');
    return res.json().results;
};
  