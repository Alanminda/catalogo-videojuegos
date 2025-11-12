// Datos de Prueba 

const videojuegos = [
  {
    id: 1,
    nombre :"Elden Ring",
    genero: "RPG de acción",
    plataforma: "PC, PS4, PS5, Xbox One, Xbox Series X/S",
    rating: 4.8,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png"
  },
  {
    id: 2,
    nombre:"God of War",
    genero: " Acción · Aventura · PS4 / PS5",
    plataforma: "PC, PS4, PS5, Xbox One, Xbox Series X/S",
    rating: 4.9,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6a5r.png"
  },
    {
  id: 3,
    nombre:"zelda",
    genero: " aventura . Mundo Abierto .Switch",
    plataforma: "PC, PS4, PS5, Xbox One, Xbox Series X/S",
    rating: 4.7,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co48qj.png"
    },
    {
    id: 4,
    nombre:"fornite",
    genero: " Batlle Royale . Multiplataforma ",
    rating: 4.3,
    imagen: "https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5d.png"
    },
];

const grid = document.querySelector('#grid-videojuegos');

//Funcion para pintar los cards
function renderVideojuegos(lista) {
    grid.innerHTML = '';//limpiar el grid antes de renderizar
    lista.forEach((juego) => {
        // Creamos el html de cada card 
        const card = document.createElement('article');
        card.className = 'bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col';

        //Insertamos el contenido de las card
        card.innerHTML = `
        <img 
            src="${juego.imagen}" 
            alt="${juego.nombre}"
            class="w-full h-48 object-cover">
        <div class="p-4 flex flex-col gap-2 flex-1">
            <h3 class="text-lg font-semibold text-slate-900">${juego.nombre}</h3>
            <p class="text-sm text-slate-600 flex-1">${juego.genero}</p>
            <div class="flex items-center gap-1 mt-auto">
                <span class="text-yellow-500">★</span>
                <p class="text-sm font-semibold text-slate-700">${juego.rating}</p>
            </div>
            <button class="mt-4 w-full px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">
                Ver detalle
            </button>
        </div>
        `;
        // Agregamos la card al grid
        grid.appendChild(card);
    });

}
    renderVideojuegos(videojuegos);
