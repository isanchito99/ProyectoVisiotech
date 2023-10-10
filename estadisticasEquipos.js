//import { listaJugadores } from './index.js';

document.addEventListener("DOMContentLoaded", function () {
    
    // Obtener los parámetros de la URL.
    const params = new URLSearchParams(window.location.search);
    const equipoAcronimo = params.get("equipo");
    const jugadoresParametro = params.get("jugadores");
    const imagenEquipo = params.get("imagen");
    
    // Mostrar la imagen del equipo en un elemento img en la página.
    const imagenEquipoElement = document.getElementById("imagen-equipo"); // Reemplaza "imagen-equipo" con el ID de tu elemento de imagen.
    imagenEquipoElement.src = imagenEquipo;
    imagenEquipoElement.alt = equipoAcronimo;
    console.log(equipoAcronimo);
    console.log(jugadoresParametro);
    // Verificar si se proporcionaron los parámetros necesarios.
    if (equipoAcronimo && jugadoresParametro) {
      // Decodificar y analizar la cadena JSON de jugadores.
      const jugadoresEquipo = JSON.parse(decodeURIComponent(jugadoresParametro));

      console.log(jugadoresEquipo);
  
      //Muestro los jugadores en lista
      const listaJugadoresUl = document.getElementById("lista-jugadores");
      jugadoresEquipo.forEach((jugador) => {
        const jugadorLi = document.createElement("li");
        jugadorLi.textContent = jugador.player_name;
        listaJugadoresUl.appendChild(jugadorLi);
      });
    } else {
      // Manejar el caso en el que no se proporcionaron los parámetros adecuados.
      console.error("Parámetros de URL faltantes o incorrectos.");
    }
  });
  
