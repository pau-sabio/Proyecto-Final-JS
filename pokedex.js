let ALL_POKEMONS = [];

const typeColors= {
  fire: "#FF4500",
  grass: "#006400",
  water: "#00FFFF",
  flying: "#F4A460",
  electric: "#FFD700",
  ground: "#8B4513",
  rock: "#C0C0C0",
  fairy: "#FFB6C1",
  bug: "#98FB98",
  poison: "#BA55D3",
  dragon: "#663399",
  psychic: "#FF69B4",
  fighting: "#A52A2A",
  normal: "#FFDAB9",
  ghost: "#800080",
  steel: "#708090",
  ice: "#ADD8E6",
  dark: "#191970",
};

const paintPokemons = (pokemonsToPaint) => {
  const pokedex$$ = document.querySelector("#pokedex");
  pokedex$$.innerHTML = "";

  pokemonsToPaint.forEach((pokemon) => {
    const pokemonCard$$ = document.createElement("div");
    pokemonCard$$.className = "pokemon__card";
    
    const threeDigitsId = pokemon.id.toString().padStart(3, "0");
    const pokemonHealth = pokemon.stats[0].base_stat;
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const pokemonTypes = pokemon.types.map((type) => type.type.name);
    const type = pokemonTypes.length ? pokemonTypes[0] : "normal";
    

    const renderTypes = () => {
      const hasTwoTypes = pokemonTypes.length === 2;
      
      if (hasTwoTypes) {
      return `
              <div class="types">
                  <img class="type_card" src=./utilities_types/${pokemon.types[0].type.name}.png></img>
                  <img class="type_card" src=./utilities_types/${pokemon.types[1].type.name}.png></img>
              </div>
              `;
      } else {
      return `<img class="type_card" src=./utilities_types/${pokemon.types[0].type.name}.png></img>`;
      }
      
  };

  

const pokemonData = `
    <div class="card-top">
      <h5 class="number">#${threeDigitsId}</h5>
      <h5 class="health">HP ${pokemonHealth}</h5>
    </div>
    <div class="img-container">
      <img src=${pokemon.sprites.front_default} alt=${pokemon.name}/>
    </div>
    <div class="info">
        <h3 class="name">${name}</h3>
        ${renderTypes()}
    </div>
${renderStats(pokemon)}

        `;
    pokemonCard$$.innerHTML = pokemonData;
    pokedex$$.appendChild(pokemonCard$$);

  });


};


const renderStats = (pokemon) => {
  return `
      <div class="stats">
          <div class="stat1">
              <h3>${pokemon.stats[1].base_stat}</h3> 
              <p>Attack</p>
          </div>
          <div class="stat1">
              <h3>${pokemon.stats[2].base_stat}</h3> 
              <p>Defense</p>
          </div>
          <div class="stat1">
              <h3>${pokemon.stats[5].base_stat}</h3> 
              <p>Speed</p>
          </div>
      </div>
  `;
};

const catchOnePokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemonApi = await fetch(url);
  const pokemon = await pokemonApi.json();

  ALL_POKEMONS.push(pokemon);
};

const catchAllPokemons = async () => {
  for (let id = 1; id < 152; id++) {
    await catchOnePokemon(id);
  }
  paintPokemons(ALL_POKEMONS);

  
};

const filterPokemon = (event) => {
  const searchInput = event.target.value.toLowerCase().trim();

  const filtered = ALL_POKEMONS.filter((pokemon) => {
    const pokemonId = pokemon.id === Number(searchInput);
    const pokemonName = pokemon.name.toLowerCase().includes(searchInput);

    return pokemonId || pokemonName;
  });
  paintPokemons(filtered);
};

const filterPokemonByType = (type) => {
  if (type === "all") {
    return paintPokemons(ALL_POKEMONS);
  }

  const filteredByType = ALL_POKEMONS.filter((pokemon) => {
    let = firstType = false;
    let = secondType = false;

    if (pokemon.types[1]) {
      secondType = pokemon.types[1].type.name === type;
    }
    if (pokemon.types[0]) {
      firstType = pokemon.types[0].type.name === type;
    }

    return firstType || secondType;

    
  });
  paintPokemons(filteredByType);

  
  //document.body.style.backgroundColor = typeColors[type];

console.log(pokemonCardStyle);


};

document.getElementById("search__input").addEventListener("input", (event) => {
  filterPokemon(event);
});



document.querySelectorAll(".types__selector").forEach((button) => {
  button.addEventListener("click", (event) => {
    filterPokemonByType(event.target.classList[1]);
  });
});








catchAllPokemons();
