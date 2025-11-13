// Selecciones del DOM
const grid = document.querySelector('#grid-videojuegos'); 
const estadoCarga = document.querySelector('#estado-carga');
const estadoError = document.querySelector('#estado-error');
const intputBusqueda = document.querySelector(
  "input[placeholder='Buscar videojuegos...']"
);

// Local data de videojuegos si la API no funciona
const videojuegosLocales = [
  {
    title: "Elden Ring",
    thummb: "https://images.igdb.com/igdb/image/upload/t_cover_big/co1r76.png",
    normalPrice: 59.99,
    salePrice: 39.99,
    savings: 33
  },
  {
    title: "Need for Speed",
    thummb: "https://images.igdb.com/igdb/image/upload/t_cover_big/co6a5r.png",
    normalPrice: 49.99,
    salePrice: 29.99,
    savings: 40
  }
];

// Función para pintar los cards
function renderVideojuegos(lista) {
  if (!grid) {
    console.error('No se encontró el elemento #grid-videojuegos');
    return;
  }
  
  grid.innerHTML = ''; // Limpiar el grid antes de renderizar
  
  lista.forEach((juego) => {
    // Ajusta los nombres de las propiedades 
    const titulo = juego.title || juego.external || "Juego";
    const thumb = juego.thumb || juego.thummb || juego.thumbnail || "";
    
    // Precio y ahorro con fallbacks
    const normal = juego.normalPrice ?? "_";
    const oferta = juego.salePrice ?? juego.cheapest ?? "_";
    const ahorro = juego.savings ? Math.round(juego.savings) : null;

    // Creamos el html de cada card 
    const card = document.createElement('article');
    card.className = 'bg-white rounded-xl shadow-sm overflow-hidden border border-slate-100 flex flex-col';

    // Insertamos el contenido de la card
    card.innerHTML = `
      <img 
        src="${thumb}" 
        alt="${titulo}"
        class="w-full h-48 object-cover"
        onerror="this.style.backgroundColor='#e2e8f0'; this.style.display='none';">
      <div class="p-4 flex flex-col gap-2 flex-1">
        <h3 class="text-lg font-semibold text-slate-900">${titulo}</h3>
        <p class="text-xs text-slate-600">
          Precio: ${
            normal && normal !== "_" ? `<s>$${normal}</s>` : "_"
          }
          ${
            oferta && oferta !== "_"
              ? `<span class="font-semibold text-slate-900">$${oferta}</span>`
              : ""
          }
          ${ahorro ? ` · Ahorro ${ahorro}%` : ""}
        </p>
        
        <button class="mt-4 w-full px-4 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800">
          Ver detalle
        </button>
      </div>
    `;
    // Agregamos la card al grid
    grid.appendChild(card);
  });
  
  // Ocultar los mensajes de estado
  if (estadoCarga) {
    estadoCarga.classList.add("hidden");
  }
  if (estadoError) {
    estadoError.classList.add("hidden");
  }
}

// Función asincrónica para cargar videojuegos inicial
async function cargarVideojuegosIncial() {
  try {
    const url = "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20";
    const resp = await fetch(url); // Espera la respuesta de la API
    
    if (!resp.ok) {
      throw new Error("Error en la respuesta de la API");
    }
    
    const data = await resp.json(); // Espera la conversión a JSON
    window._juegosCache = data;
    renderVideojuegos(data);
  } catch (e) {
    console.error("Error al cargar CheapShark", e);
    if (estadoError) {
      estadoError.classList.remove("hidden");
    }
    renderVideojuegos(videojuegosLocales);
  } finally {
    if (estadoCarga) {
      estadoCarga.classList.add("hidden");
    }
  }
}

// Ejecutar la carga al cargar la página
cargarVideojuegosIncial();
