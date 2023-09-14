


const getAll = async (req, res) => {
    try {
        const pokemonData = [];
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);

        const pokemons = await response.json();
        const pokemonUrls = pokemons.results.map(pokemon => pokemon.url)
        for (let i = 0; i < pokemonUrls.length; i++) {
          const info = await fetch(pokemonUrls[i]);
          const pokemon = await info.json()
          const object = {
            name: pokemon.name,
            img: pokemon.sprites.front_default
          }
          pokemonData.push(object)
        }
        res.json(pokemonData);
      } catch (error) {
        res.status(404).json({ message: 'Pokémon no encontrado' + error});
      }
};


const getByName = async (req, res) =>{
  try {
    const { pokemonName } = req.params
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemon = await response.json();
    const object = {
      name: pokemon.name,
      img: pokemon.sprites.front_default
    }
    res.json(object)
  } catch (error) {
    res.status(404).json({ message: 'Pokémon no encontrado' });
  }
}

module.exports = {
    getAll,
    getByName
}