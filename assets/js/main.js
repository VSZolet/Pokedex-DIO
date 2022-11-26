const pokedex = document.getElementById('pokedex');
const cachedPokemon = {};

const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=150`;
    const res = await fetch(url);
    const data = await res.json();
    const pokemon = data.results.map((data, index) => ({
        name: data.name,
        id: index + 1,
        image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
    }));

    displayPokemon(pokemon);
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon.map((pokeman) =>
                `
    <li class="card" onclick="selectPokemon(${pokeman.id})">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        </a>
    </li>
        `).join('');
    pokedex.innerHTML = pokemonHTMLString;
};

const selectPokemon = async (id) => {
    if (!cachedPokemon[id]) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
        const res = await fetch(url);
        const pokemon = await res.json();
        cachedPokemon[id] = pokemon;
        displayPokemonPopup(pokemon);
    } else {
        displayPokemonPopup(cachedPokemon[id]);
    }
};

const displayPokemonPopup = (pokemon) => {
    console.log(pokemon);
    const type = pokemon.types.map((type) => type.type.name).join(', ');
    const htmlString = `
        <div class="popup" >
            <button id="closeBtn" onclick="closePopup()">Close</button>
            <div class="card">
                <img class="card-image" src="${pokemon.sprites['front_default']}"/>
                <h2 class="card-title">${pokemon.name}</h2>
                <p><small>
                Type: ${type} |
                Height: ${pokemon.height} |
                Weight: ${pokemon.weight }
                </small></p>
            </div>
        </div>
    `;
    pokedex.innerHTML = htmlString + pokedex.innerHTML;
};

const closePopup = () => {
    const popup = document.querySelector('.popup');
    popup.parentElement.removeChild(popup);
};

fetchPokemon();