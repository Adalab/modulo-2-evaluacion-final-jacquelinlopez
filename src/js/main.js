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
   

    fetch(`https://api.jikan.moe/v4/anime?q=${inputText}`)
    .then((resp) => resp.json())
    .then((info) =>{
         arraySeries = info.data;
        renderResults(arraySeries);
    });
};

btn.addEventListener('click', handleClick);


//funcion para pintar resultados//
function renderResults(series){
    listResults.innerHTML = '';
   for(const serie of series){
    
       let image =serie.images.jpg.image_url;

       if(image === "https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png" ) {
           image = "https://placehold.co/600x400"
       }

       //añado la lista a mi html//
       listResults.innerHTML += `<li class="list js-anime" id=${series.mal_id}>  
           <h5>${series.title}</h5>
           <img src="${image}" class="image" alt="${series.title} "/>
           </li>`

           /*const allAnime = document.querySelectorAll('.js-anime');
           for (const anime of allAnime){
               anime.addEventListener('click',handleAddFavorites);
           }*/
   }
}

     

