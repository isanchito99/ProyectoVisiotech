//export const listaJugadores = listaJugadores;
//const url = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';
//const url2 = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/?page=2';

//ARRAY DONDE SE ALMACENA LOS JUGADORES
let listaJugadores = [];

window.onload = async function () {
    listaJugadores = await llamarApiTodasLasPaginas();



    listaJugadores.forEach(jugador => {
        console.log(jugador.team);
    });
    const inputNombre = document.getElementById('nombre');
    inputNombre.addEventListener('click', borrarTablaYJugadoresSugeridos);
}
//FUNCION DONDE RECORREMOS TODAS LAS PAGINACIONES DE LA API
async function llamarApiTodasLasPaginas() {
    const urlBase = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';
    //llamamos a la API de primeras para los jugadores de la URL base
    const firstData = await llamarApi(urlBase);
    listaJugadores.push(...firstData.results);//metemos los jugadores en el array

    console.log(await llamarApi(urlBase));
    let currentPage = 2;
    let totalPages = 7;
    //HACEMOS UN BUCLE DONDE RECORREMOS LA API POR PAGINACIONES Y VAMOS INSERTANDO LOS JUGADORES DE CADA PAGINACIÓN
    while (currentPage <= totalPages) {
        const url = `${urlBase}/?page=${currentPage}`;
        const data = await llamarApi(url);

        if (data.results) {
            listaJugadores.push(...data.results);
            console.log(listaJugadores);
        }

        if (data.pages && data.pages.total) {
            totalPages = data.pages.total;
        }

        currentPage++;
    }

    return listaJugadores; // Devuelve la lista de jugadores al final de la función.
}
//FUNCION DONDE SE METE EN EL ARRAY LOS JUGADORES DE LA URL
async function llamarApi(url) {

    return await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(error => console.log(error));

}
//FUNCIÓN PARA BUSCAR EL JUGADOR QUE INSERTEMOS EN EL INPUT DENTRO DEL ARRAY DE JUGADORES QUE HEMOS RECORRIDO ANTES
function buscarJugador() {
   
    const inputNombre = document.getElementById('nombre').value;//coge el dato del input nombre
    const jugadorEncontrado = listaJugadores.find(jugador => jugador.player_name.toLowerCase() === inputNombre.toLowerCase());
    const contenedorResultados = document.querySelector("#tablaJugador");//cogemos el query para insertar los datos
    contenedorResultados.innerHTML = "";// Borra cualquier contenido previo dentro del contenedor
    //si se encuentra el jugador
    if (jugadorEncontrado) {
        generarContenidoHTML(jugadorEncontrado, contenedorResultados);//inserta el jugador en la tabla
    } else if (inputNombre.value == "") {
        window.alert("Por favor inserte un nombre de jugador");
    } else {
        window.alert("El jugador no se encuentra en el JSON");
        inputNombre.value = '';
        window.location.reload();

    }
}

// Función para buscar jugadores sugeridos a medida que el usuario escribe
function buscarJugadoresSugeridos() {
    const inputNombre = document.getElementById('nombre').value.toLowerCase();
    const jugadoresSugeridos = listaJugadores.filter(jugador => jugador.player_name.toLowerCase().includes(inputNombre));

    const jugadoresSugeridosLista = document.getElementById('jugadoresSugeridos');
    jugadoresSugeridosLista.innerHTML = ''; // Limpiar la lista de sugerencias

    jugadoresSugeridos.forEach(jugador => {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        listItem.textContent = jugador.player_name;
        listItem.addEventListener('click', () => seleccionarJugadorSugerido(jugador.player_name));
        jugadoresSugeridosLista.appendChild(listItem);
    });
}

// Función para seleccionar un jugador sugerido y mostrar sus estadísticas
function seleccionarJugadorSugerido(nombreJugador) {
   
    document.getElementById('nombre').value = nombreJugador;
    buscarJugador();
    document.getElementById('jugadoresSugeridos').innerHTML = ''; // Limpiar la lista de sugerencias
}
function borrarTablaYJugadoresSugeridos() {
    const contenedorResultados = document.querySelector("#tablaJugador");
    contenedorResultados.innerHTML = "";
    const jugadoresSugeridosLista = document.getElementById('jugadoresSugeridos');
    jugadoresSugeridosLista.innerHTML = '';
}

function generarContenidoHTML(jugadorEncontrado) {
    // Crear un elemento table para la tabla
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-light", "table-hover", "table-striped","border","border-dark");
    tabla.style.textAlign = "center";
    const encabezadoTabla = document.createElement("th");
    encabezadoTabla.textContent = jugadorEncontrado.player_name;
    encabezadoTabla.setAttribute("colspan", 2); // Agregar el atributo colspa
    encabezadoTabla.style.textAlign = "center";
    const filaTablaInicial = document.createElement("tr");
    filaTablaInicial.appendChild(encabezadoTabla);
    // Crear el encabezado de la tabla
    const encabezado = document.createElement("thead");
    encabezado.classList.add("thead-dark");
    const filaEncabezado = document.createElement("tr");
    filaEncabezado.classList.add("oscuridad");
    // Crear las celdas de encabezado
    const tipoEstadisticaEncabezado = document.createElement("th");

    tipoEstadisticaEncabezado.textContent = "Tipo de Estadistica";

    const valorEncabezado = document.createElement("th");

    valorEncabezado.textContent = "Valor";

    // Agregar las celdas de encabezado a la fila de encabezado

    filaEncabezado.appendChild(tipoEstadisticaEncabezado);
    filaEncabezado.appendChild(valorEncabezado);

    // Agregar la fila de encabezado al encabezado de la tabla
    encabezado.appendChild(filaTablaInicial);
    encabezado.appendChild(filaEncabezado);

    // Crear el cuerpo de la tabla
    const cuerpoTabla = document.createElement("tbody");

    // Función para agregar una fila a la tabla
    function agregarFila(nombreJugador, tipoEstadistica) {
        const fila = document.createElement("tr");

        const celdaNombreJugador = document.createElement("td");
        celdaNombreJugador.textContent = nombreJugador;

        const celdaTipoEstadistica = document.createElement("td");
        celdaTipoEstadistica.textContent = tipoEstadistica;

        fila.appendChild(celdaNombreJugador);
        fila.appendChild(celdaTipoEstadistica);
        cuerpoTabla.appendChild(fila);
    }

    // Agregar las filas con los datos de los jugadores
    agregarFila("Puntos", jugadorEncontrado.PTS);
    agregarFila("Asistencias", jugadorEncontrado.AST);
    agregarFila("Bloqueos", jugadorEncontrado.BLK);
    agregarFila("Robos", jugadorEncontrado.STL);
    agregarFila("Rebotes Defensivos", jugadorEncontrado.DRB);
    agregarFila("Rebotes Ofensivos", jugadorEncontrado.ORB);
    agregarFila("Perdidas", jugadorEncontrado.TOV);
    agregarFila("Edad", jugadorEncontrado.age);
    agregarFila("Rebotes Totales", jugadorEncontrado.TRB);
    agregarFila("Minutos Jugados", jugadorEncontrado.minutes_played);
    agregarFila("Porcentaje de Tiros de 2", (jugadorEncontrado.two_percent * 100).toFixed(2) + "%");
    agregarFila("Porcentaje de Tiros de 3", (jugadorEncontrado.three_percent * 100).toFixed(2) + "%");
    agregarFila("Faltas Personales", jugadorEncontrado.PF);
    agregarFila("Partidos jugados", jugadorEncontrado.games);
    agregarFila("Titularidades", jugadorEncontrado.games_started);


    // Agregar el encabezado y el cuerpo de la tabla a la tabla
    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    // Crear un elemento div para contener la tabla
    const contenidoDiv = document.createElement("div");
    contenidoDiv.appendChild(tabla);

    const contenedorResultados = document.querySelector("#tablaJugador");


    // Agregar el contenido HTML al elemento contenedor
    contenedorResultados.appendChild(contenidoDiv);

    return contenidoDiv;
}







