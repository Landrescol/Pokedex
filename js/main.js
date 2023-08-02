// const { response } = require("express");

const search = document.querySelector('#search')

search.addEventListener('submit',  (element) => {
    element.preventDefault()
    const inputFiltro = document.querySelector('#input-filtro').value
    console.log(inputFiltro)
    resultadoBusqueda(inputFiltro) 
});

// Invocacion pokemon mediante la URL de la API
const listaPokemon = document.querySelector('#listaPokemon')
let URL = 'https://pokeapi.co/api/v2/pokemon/'

for (let i = 1; i < 1010; i++) {
    fetch(URL + i)
        .then((response) => response.json())
        .then(data => mostrarPokemon(data))
}  

    for (let i = 0; i < listaPokemon.length; i++) {
        let nombre  = lista[i].innerHTML;
        if(nombre.includes(filtro)) {
            lista[i].style.display = 'block'; // Mostrar elemento
        } else {
            lista[i].style.display = 'none'; //Ocultar elemnto 
        }
    }


function resultadoBusqueda (valor) {
    const  urlOnePokemon = `https://pokeapi.co/api/v2/pokemon/${valor}`;
    return fetch(urlOnePokemon) 
    .then(response => response.json()) 
    .then( data => console.log (data))
    

    .catch( error => console.log(`Ingresaste nombre o numero mal ${error}`) )
}  



function mostrarPokemon(poke) {
    let tipos = poke.types.map(type =>  
        `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join(''); 
    
    let pokeId = poke.id.toString();
    if (pokeId.length === 1 ) {
        pokeId = '00'+ pokeId; 
    } else if (pokeId.length === 2) {
        pokeId = '0' + pokeId;
    }


    const div = document.createElement('div');
    div.classList.add('item');
    div.innerHTML = `
    <p class="pokemonIdBack">#${pokeId}</p>
    <div class="pokemonImage">
        <img src="${poke.sprites.other['official-artwork'].front_default}" alt="${poke.name}">
    </div>
    <div  class="pokemonInfo">
        <div class="nombreContenedor">
            <p class="pokemonId">#${pokeId}</p>
            <h2 class="pokemonNombre">${poke.name}</h2>
        </div>
        <div class="pokemonTipos">
                ${tipos}
        </div>
        <div class="pokemonStats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}kg</p>
        </div> 
    `;
    listaPokemon.append(div);
}




