'use strict';
//Traigo a mis elementos del html para Busqueda//

const inputSearch = document.querySelector('.js-search');
const btn = document.querySelector('.js-btn');
const reset = document.querySelector('.js-reset');
const listResults = document.querySelector('.js-results');
const listFavs = document.querySelector('.js-favs');
let arraySeries = [];
let arrayFav = [];



 /*1-Busqueda de series ---> 
  -Escuho evento sobre el boton buscar--lo meto dentro de una funcion.  
  -Agregar prevent default.
  
  */

 function handleSearch(ev){
    ev.preventDefault(); //prevent del boton//
    const inputValue = input.value;//guardo valor input//

    fetch('https://api.jikan.moe/v4/anime?q=${inputValue}')
    .then((resp)=> resp.json())
    .then((data)=>{
        const animeApi = data.data;

        arraySeries=[];

        //bucle sobre el array para obtener datos 

        for(const serie of animeApi) {

        }
    });



 }

