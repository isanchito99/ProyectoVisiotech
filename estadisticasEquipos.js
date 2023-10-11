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

    insertarMejoresJugadores(jugadoresEquipo);
  } else {
    // Manejar el caso en el que no se proporcionaron los parámetros adecuados.
    console.error("Parámetros de URL faltantes o incorrectos.");
  }
});

function insertarMejoresJugadores(jugadoresEquipo) {
  // Ordena a los jugadores por PTS, AST y TRB en orden descendente
  const mejoresJugadoresPTS = jugadoresEquipo.slice().sort((a, b) => b.PTS - a.PTS).slice(0, 3);
  const mejoresJugadoresAST = jugadoresEquipo.slice().sort((a, b) => b.AST - a.AST).slice(0, 3);
  const mejoresJugadoresTRB = jugadoresEquipo.slice().sort((a, b) => b.TRB - a.TRB).slice(0, 3);

  // Elementos para insertar en la web
  const puntosColumna = document.getElementById("tablaPuntos");
  const asistenciasColumna = document.getElementById("tablaAsistencias");
  const rebotesColumna = document.getElementById("tablaRebotes");

  // Inserta los tres mejores jugadores en cada categoría
  const puntosH2 = document.createElement("h2");
  puntosH2.textContent="Puntos";
  puntosColumna.appendChild(puntosH2);
  mejoresJugadoresPTS.forEach(jugador => {
    const jugadoresPuntosEquipo = document.createElement("p");
    jugadoresPuntosEquipo.textContent = jugador.player_name;
    puntosColumna.appendChild(jugadoresPuntosEquipo);
  });
  const asistenciasH2 = document.createElement("h2");
  asistenciasH2.textContent="Asistencias";
  asistenciasColumna.appendChild(asistenciasH2);
  mejoresJugadoresAST.forEach(jugador => {
    const jugadoresAsistenciasEquipo = document.createElement("p");
    jugadoresAsistenciasEquipo.textContent = jugador.player_name;
    asistenciasColumna.appendChild(jugadoresAsistenciasEquipo);
  });
  const rebotesH2 = document.createElement("h2");
  rebotesH2.textContent="Rebotes";
  rebotesColumna.appendChild(rebotesH2);
  mejoresJugadoresTRB.forEach(jugador => {
    const jugadoresRebotesEquipo = document.createElement("p");
    jugadoresRebotesEquipo.textContent = jugador.player_name;
    rebotesColumna.appendChild(jugadoresRebotesEquipo);
  });
}


