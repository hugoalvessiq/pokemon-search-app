const searchInput = document.getElementById("search-input");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const image = document.getElementById("image");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

searchInput.addEventListener("keydown", function (event) {
  // Check if the key pressed was 'Enter'
  if (event.key === "Enter") {
    fetchData()
    searchInput.value = "";
  }
});

const fetchData = async () => {
  try {
    const pokeApi = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${filtrarInput(
      searchInput.value
    )}`;
    const res = await fetch(pokeApi);

    if (res.status === 200) {
      const data = await res.json();
      updatePokemonInfo(data);
    } else {
      alert("Pokémon not found");
      searchInput.value = "";
    }
  } catch (error) {
    console.error(`An error has occurred: ${error.message}`);
  }
};

function updatePokemonInfo(data) {
  pokemonName.innerHTML = `${data.name}`.toUpperCase();
  pokemonId.innerText = `#${data.id}`;
  weight.innerText = `Weight: ${data.weight}`;
  height.innerText = `Height: ${data.height}`;
  image.innerHTML = `<img id="sprite" src="${data.sprites.front_default}" alt="${data.name} front default sprite">`;
  hp.innerText = `${data.stats[0].base_stat}`;
  attack.innerText = `${data.stats[1].base_stat}`;
  defense.innerText = `${data.stats[2].base_stat}`;
  specialAttack.innerText = `${data.stats[3].base_stat}`;
  specialDefense.innerText = `${data.stats[4].base_stat}`;
  speed.innerText = `${data.stats[5].base_stat}`;

  // Clear the contents of the types div before adding new classes
  types.innerHTML = "";
  data.types.map((item) => {
    types.innerHTML += `<span class="${item.type.name}">${item.type.name}</span> `;
  });
}

function filtrarInput(input) {
  // Checks if the input is a number
  if (!isNaN(input)) {
    const num = parseInt(input);
    if (num >= 1 && num <= 1302) {
      return num;
    } else {
      return null;
      // return alert("Pokémon not found");
    }
  } else {
    // Converte a string para minúsculas
    input = input.toLowerCase();

    // Replace ♀ with '-f' and ♂ with '-m'
    if (input.endsWith("♀")) {
      input = input.slice(0, -1) + "- f";
    } else if (input.endsWith("♂")) {
      input = input.slice(0, -1) + "-m";
    }

    // Remove special characters and replace spaces with -
    input = input.replace(/[^a-zA-Z0-9 ]/g, "").replace(/ /g, "-");

    return input;
  }
}
