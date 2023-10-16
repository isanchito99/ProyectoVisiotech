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
      jugadorLi.classList.add("list-group-item", "list-group-item-secondary")
      jugadorLi.textContent = jugador.player_name;
      listaJugadoresUl.appendChild(jugadorLi);
    });

    insertarMejoresJugadores(jugadoresEquipo);

    insertarTablaJugadores(jugadoresEquipo);


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
  puntosColumna.style.borderRight = '1px solid white';
  const asistenciasColumna = document.getElementById("tablaAsistencias");
  asistenciasColumna.style.borderRight = '1px solid white';
  const rebotesColumna = document.getElementById("tablaRebotes");

  // Inserta los tres mejores jugadores en cada categoría
  const puntosH2 = document.createElement("h2");
  puntosH2.textContent = "Puntos";
  puntosColumna.appendChild(puntosH2);
  mejoresJugadoresPTS.forEach(jugador => {
    const jugadoresPuntosEquipo = document.createElement("p");
    jugadoresPuntosEquipo.textContent = jugador.player_name;
    puntosColumna.appendChild(jugadoresPuntosEquipo);
  });
  const asistenciasH2 = document.createElement("h2");
  asistenciasH2.textContent = "Asistencias";
  asistenciasColumna.appendChild(asistenciasH2);
  mejoresJugadoresAST.forEach(jugador => {
    const jugadoresAsistenciasEquipo = document.createElement("p");
    jugadoresAsistenciasEquipo.textContent = jugador.player_name;
    asistenciasColumna.appendChild(jugadoresAsistenciasEquipo);
  });
  const rebotesH2 = document.createElement("h2");
  rebotesH2.textContent = "Rebotes";
  rebotesColumna.appendChild(rebotesH2);
  mejoresJugadoresTRB.forEach(jugador => {
    const jugadoresRebotesEquipo = document.createElement("p");
    jugadoresRebotesEquipo.textContent = jugador.player_name;
    rebotesColumna.appendChild(jugadoresRebotesEquipo);
  });
}

function insertarTablaJugadores(jugadoresEquipo) {
  console.log(jugadoresEquipo);
  let puntosTotalesEquipo = 0; //variable para insertar los puntos totales del equipo para insertarlo posteriormente
  let edadTotalEquipo = 0;
  let numeroJugadores=jugadoresEquipo.length;
  
  // Crear un elemento table para la tabla
  const tabla = document.createElement("table");
  tabla.classList.add("table", "table-light", "table-hover", "table-striped", "border", "border-dark");
  tabla.style.textAlign = "center";

  // Crear el encabezado de la tabla
  const encabezado = document.createElement("thead");
  encabezado.classList.add("thead-dark");
  const filaEncabezado = document.createElement("tr");
  filaEncabezado.classList.add("oscuridad");

  // Crear las celdas de encabezado
  const encabezados = ["Nombre Jugador", "Puntos", "Asistencias", "Rebotes", "Tapones", "Minutos", "Edad"];
  for (const encabezadoTexto of encabezados) {
    const tipoEstadisticaEncabezado = document.createElement("th");
    tipoEstadisticaEncabezado.textContent = encabezadoTexto;
    filaEncabezado.appendChild(tipoEstadisticaEncabezado);
  }



  // Agregar la fila de encabezado al encabezado de la tabla
  encabezado.appendChild(filaEncabezado);

  // Crear el cuerpo de la tabla
  const cuerpoTabla = document.createElement("tbody");

  // Función para agregar una fila por jugador
  function agregarFilaJugador(jugador) {
    const fila = document.createElement("tr");

    // Datos del jugador
    const datosJugador = [
      jugador.player_name,
      jugador.PTS,
      jugador.AST,
      jugador.TRB,
      jugador.BLK,
      jugador.minutes_played,
      jugador.age
    ];

    // Crear las celdas para los datos del jugador
    for (const dato of datosJugador) {
      const celda = document.createElement("td");
      celda.textContent = dato;
      fila.appendChild(celda);
    }
    // Sumar los puntos del jugador a los puntos totales del equipo
    puntosTotalesEquipo += jugador.PTS;
    edadTotalEquipo += jugador.age;
    cuerpoTabla.appendChild(fila);

  }

  // Agregar filas para cada jugador en el equipo
  for (const jugador of jugadoresEquipo) {
    agregarFilaJugador(jugador);
  }

  // Agregar el encabezado y el cuerpo de la tabla a la tabla
  tabla.appendChild(encabezado);
  tabla.appendChild(cuerpoTabla);

  // Crear un elemento div para contener la tabla
  const contenidoDiv = document.createElement("div");
  contenidoDiv.appendChild(tabla);

  const contenedorResultados = document.querySelector("#tablaJugador");

  // Agregar el contenido HTML al elemento contenedor
  contenedorResultados.appendChild(contenidoDiv);

  // Crear párrafos para mostrar los totales
  const puntosParrafo = document.createElement("p");
  const mediaPuntosPartido=(puntosTotalesEquipo/82).toFixed(2);
  puntosParrafo.classList.add("bg-light","bg-gradient","text-dark");
  puntosParrafo.style.fontWeight="700";
  puntosParrafo.textContent = `${mediaPuntosPartido}`;

  const edadParrafo = document.createElement("p");
  edadParrafo.classList.add("bg-light","bg-gradient","text-dark");
 //edadParrafo.toFixed(2);
  edadParrafo.style.fontWeight="700";
  
  edadParrafo.textContent = `${(edadTotalEquipo/numeroJugadores).toFixed(2)}`;

  // Obtener los divs donde se mostrarán los párrafos
  const puntosDiv = document.querySelector("#puntosMediaEquipo");
  const edadDiv = document.querySelector("#edadMediaEquipo");

  // Agregar los párrafos a los divs correspondientes
  puntosDiv.appendChild(puntosParrafo);
  edadDiv.appendChild(edadParrafo);

  return contenidoDiv;
}









