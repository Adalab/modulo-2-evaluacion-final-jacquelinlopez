'use strict';

//Traigo a mis elementos del html para Busqueda//

const inputSearch = document.querySelector('.js-search');
const btn = document.querySelector('.js-btn');
const reset = document.querySelector('.js-reset');

const listResults = document.querySelector('.js-results');

let listFavs = document.querySelector('.js-favs');

//arrays para guardar 
let arraySeries = [];
let arrayFav = [];



 /*1-Busqueda de series ---> 
  -Escucho evento sobre el boton buscar--lo meto dentro de una funcion.  
  -Agregar prevent default.
  -Fetch
  -Pintar resultados 
  -Bucle recorriendo array
  
  */

  //Escuchamos el evento y le decimos al servidor que nos de una lista que contenga el input que se ingreso//

 function handleClick(ev){
    ev.preventDefault(); //prevent del boton//
    const inputText = inputSearch.value;//guardo valor input//

   //solicitud a la api//

    fetch(`https://api.jikan.moe/v4/anime?q=${inputText}`)
    .then((resp) => resp.json())
    .then((info) =>{
         arraySeries = info.data;
        renderResults(arraySeries);
    });
}

btn.addEventListener('click', handleClick);


//funcion para pintar resultados//
function renderResults(series){
    listResults.innerHTML = '';// limpia resultados de antes

    for(const serie of series){
        let image = serie.images.jpg.image_url;
    //si no tenemos imagen , asigna un placeholder//
        if(image === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" ){
        image = "https://placehold.co/600x400";
       }

       //añado la lista a mi html//
       listResults.innerHTML += `<li class="list js-anime" id=${serie.mal_id}>  
           <h5>${serie.title}</h5>
           <img src="${image}" class="image" alt="${serie.title} "/>
           </li>`;
    }


 //escuchar el evento click en cada serie//          
    const allAnime = document.querySelectorAll('.js-anime');
    allAnime.forEach((anime)=>{
    anime.addEventListener('click',handleAddFavorites);
    });
}

// Función para agregar los favoritos
function handleAddFavorites(ev){
    const serieId = ev.currentTarget.id; // Obtener el ID de la serie
    const selectedSerie = arraySeries.find(serie => serie.mal_id == serieId); // Encontrar la serie en el array

    // Crear el elemento favorito
    const favItem = document.createElement('li');
    favItem.classList.add('fav-item');
    favItem.innerHTML = `
        <h5>${selectedSerie.title}</h5>
        <img src="${selectedSerie.images.jpg.image_url}" alt="${selectedSerie.title}" />
    `;

    // Añadirlo a la lista de favoritos
    listFavs.appendChild(favItem);

    // Guardar el favorito en el localStorage//
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({
        title: selectedSerie.title,
        image: selectedSerie.images.jpg.image_url,
        id: selectedSerie.mal_id
    });

    localStorage.setItem('favorites', JSON.stringify(favorites));

    // Cambiar el color de fondo
    const allAnime = document.querySelectorAll('.js-anime');
    allAnime.forEach(item => {
        item.style.backgroundColor = ''; // Limpiamos el color de fondo
    });
    ev.currentTarget.style.backgroundColor = '#f0f0f0'; // Establecemos el color de fondo del elemento seleccionado
}

// Función para renderizar los favoritos desde el localStorage
function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    // Limpiar la lista de favoritos antes de volver a mostrarla
    listFavs.innerHTML = '';

    // Recorrer los favoritos y mostrarlos
    favorites.forEach(fav => {
        const favItem = document.createElement('li');
        favItem.classList.add('fav-item');
        favItem.innerHTML = `
            <h5>${fav.title}</h5>
            <img src="${fav.image}" alt="${fav.title}" />
        `;
        listFavs.appendChild(favItem);
    });
}

// Llamar a la función para mostrar los favoritos al cargar la página
renderFavorites();

// Función para resetear los resultados
reset.addEventListener('click', () => {
    listResults.innerHTML = ''; // Limpiar los resultados de búsqueda
    listFavs.innerHTML = ''; // Limpiar los favoritos
    inputSearch.value = ''; // Limpiar el input
});

     

