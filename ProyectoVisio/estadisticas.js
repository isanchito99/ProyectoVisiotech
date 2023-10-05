
const url = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';
const url2 = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/?page=2';
let listaJugadores = [];
window.onload = async function () {

    listaJugadores = await llamarApi();
    encontrarMejorJugador(listaJugadores);
    encontrarPeorJugador(listaJugadores);

}

function encontrarMejorJugador(jugadores) {
    //Variables de creacion de contenido
    const estadisticaColumn = document.createElement("div");
    estadisticaColumn.classList.add("col-md-6", "mb-6");

    //Variables de estadisticas
    let jugadorMejorPTS = null;
    let jugadorMejorAST = null;
    let jugadorMejorBLK = null;
    let jugadorMejorSTL = null;
    let jugadorMejorDRB = null;
    let jugadorMejorORB = null;
    let jugadorMejorTOV = null;
    let jugadorMejorEdad = null;
    let jugadorMejorTRB = null;
    let jugadorMasMinutos = null;
    let jugadorMejorPorcentaje2 = null;
    let jugadorMejorPorcentaje3 = null;

    jugadores.results.forEach(jugador => {
        //JUGADOR CON MÁS PUNTOS
        if (!jugadorMejorPTS || jugador.PTS > jugadorMejorPTS.PTS && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorPTS = jugador;
        }
        //JUGADOR CON MÁS ASISTENCIAS
        if (!jugadorMejorAST || jugador.AST > jugadorMejorAST.AST && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorAST = jugador;
        }
        //JUGADOR CON MÁS BLOQUEOS
        if (!jugadorMejorBLK || jugador.BLK > jugadorMejorBLK.BLK && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorBLK = jugador;
        }
        //JUGADOR CON MÁS ROBOS DE BALÓN
        if (!jugadorMejorSTL || jugador.STL > jugadorMejorSTL.STL && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorSTL = jugador;
        }
        //JUGADOR CON MAS REBOTES DEFENSIVOS
        if (!jugadorMejorDRB || jugador.DRB > jugadorMejorDRB.DRB && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorDRB = jugador;
        }
        //JUGADOR CON MAS REBOTES OFENSIVOS
        if (!jugadorMejorORB || jugador.ORB > jugadorMejorORB.ORB && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorORB = jugador;
        }
        //JUGADOR CON MENOS PERDIDAS
        if (!jugadorMejorTOV || jugador.TOV < jugadorMejorTOV.TOV && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorTOV = jugador;
        }
        //JUGADOR CON MENOS AÑOS
        if (!jugadorMejorEdad || jugador.age < jugadorMejorEdad.age ) {
            jugadorMejorEdad = jugador;
        }
        //JUGADOR CON MAS REBOTES TOTALES
        if (!jugadorMejorTRB || jugador.TRB > jugadorMejorTRB.TRB && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorTRB = jugador;
        }
        //JUGADOR CON MÁS MINUTOS JUGADOS
        if (!jugadorMasMinutos || jugador.minutes_played > jugadorMasMinutos.minutes_played && jugadorMejorPTS.minutes_played>200) {
            jugadorMasMinutos = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 2
        if (!jugadorMejorPorcentaje2 || jugador.two_percent > jugadorMejorPorcentaje2.two_percent && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorPorcentaje2 = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 3
        if (!jugadorMejorPorcentaje3 || jugador.three_percent > jugadorMejorPorcentaje3.three_percent && jugadorMejorPTS.minutes_played>200) {
            jugadorMejorPorcentaje3 = jugador;
        }

    });


    const contenidoHTML = generarContenidoHTML(jugadorMejorPTS, jugadorMejorAST,
        jugadorMejorBLK, jugadorMejorSTL, jugadorMejorDRB, jugadorMejorORB, jugadorMejorTOV, jugadorMejorEdad,
        jugadorMejorTRB, jugadorMasMinutos, jugadorMejorPorcentaje2, jugadorMejorPorcentaje3);


    // Obtener el elemento donde deseas mostrar el contenido (por ejemplo, un div con id "resultados")
    const contenedorResultados = document.querySelector("#resultados");


    // Agregar el contenido HTML al elemento contenedor
    contenedorResultados.appendChild(contenidoHTML);
}




function encontrarPeorJugador(jugadores) {
    let jugadorPeorPTS = null;
    let jugadorPeorAST = null;
    let jugadorPeorBLK = null;
    let jugadorPeorSTL = null;
    let jugadorPeorDRB = null;
    let jugadorPeorORB = null;
    let jugadorPeorTOV = null;
    let jugadorPeorEdad = null;
    let jugadorPeorTRB = null;
    let jugadorMenosMinutos = null;
    let jugadorPeorPorcentaje2 = null;
    let jugadorPeorPorcentaje3 = null;

    jugadores.results.forEach(jugador => {
        //JUGADOR CON MENOS PUNTOS
        if (!jugadorPeorPTS || jugador.PTS < jugadorPeorPTS.PTS && jugadorPeorPTS.minutes_played > 200) {
            jugadorPeorPTS = jugador;
        }
        //JUGADOR CON MENOS ASISTENCIAS
        if (!jugadorPeorAST || jugador.AST < jugadorPeorAST.AST && jugadorPeorAST.minutes_played > 200) {
            jugadorPeorAST = jugador;
        }
        //JUGADOR CON MENOS BLOQUEOS
        if (!jugadorPeorBLK || jugador.BLK < jugadorPeorBLK.BLK && jugadorPeorBLK.minutes_played > 200) {
            jugadorPeorBLK = jugador;
        }
        //JUGADOR CON MENOS ROBOS DE BALÓN
        if (!jugadorPeorSTL || jugador.STL < jugadorPeorSTL.STL && jugadorPeorSTL.minutes_played > 200) {
            jugadorPeorSTL = jugador;
        }
        //JUGADOR CON MAS REBOTES DEFENSIVOS
        if (!jugadorPeorDRB || jugador.DRB < jugadorPeorDRB.DRB && jugadorPeorDRB.minutes_played>200) {
            jugadorPeorDRB = jugador;
        }
        //JUGADOR CON MAS REBOTES OFENSIVOS
        if (!jugadorPeorORB || jugador.ORB < jugadorPeorORB.ORB && jugadorPeorORB.minutes_played>200) {
            jugadorPeorORB = jugador;
        }
        //JUGADOR CON MENOS PERDIDAS
        if (!jugadorPeorTOV || jugador.TOV > jugadorPeorTOV.TOV && jugadorPeorTOV.minutes_played>200) {
            jugadorPeorTOV = jugador;
        }
        //JUGADOR CON MENOS AÑOS
        if (!jugadorPeorEdad || jugador.age > jugadorPeorEdad.age ) {
            jugadorPeorEdad = jugador;
        }
        //JUGADOR CON MAS REBOTES TOTALES
        if (!jugadorPeorTRB || jugador.TRB < jugadorPeorTRB.TRB && jugadorPeorTRB.minutes_played>200) {
            jugadorPeorTRB = jugador;
        }
        //JUGADOR CON MÁS MINUTOS JUGADOS
        if (!jugadorMenosMinutos || jugador.minutes_played < jugadorMenosMinutos.minutes_played && jugadorMenosMinutos.minutes_played>200) {
            jugadorMenosMinutos = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 2
        if (!jugadorPeorPorcentaje2 || jugador.two_percent < jugadorPeorPorcentaje2.two_percent && jugadorPeorPorcentaje2.minutes_played>200) {
            jugadorPeorPorcentaje2 = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 3
        if (!jugadorPeorPorcentaje3 || jugador.three_percent < jugadorPeorPorcentaje3.three_percent && jugadorPeorPorcentaje3.minutes_played>200) {
            jugadorPeorPorcentaje3 = jugador;
        }
    });



    const contenidoHTML = generarContenidoHTML(jugadorPeorPTS, jugadorPeorAST,
        jugadorPeorBLK, jugadorPeorSTL, jugadorPeorDRB, jugadorPeorORB, jugadorPeorTOV, jugadorPeorEdad,
        jugadorPeorTRB, jugadorMenosMinutos, jugadorPeorPorcentaje2, jugadorPeorPorcentaje3);

    const contenedorResultados = document.querySelector("#resultados");
    console.log(contenedorResultados);

    // Agregar el contenido HTML al elemento contenedor
    contenedorResultados.appendChild(contenidoHTML);
}

async function llamarApi() {

    return await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(error => console.log(error));

}


function generarContenidoHTML(jugadorMejorPTS, jugadorMejorAST,
    jugadorMejorBLK, jugadorMejorSTL, jugadorMejorDRB, jugadorMejorORB,
    jugadorMejorTOV, jugadorMejorEdad, jugadorMejorTRB,
    jugadorMasMinutos, jugadorMejorPorcentaje2, jugadorMejorPorcentaje3) {
    // Crear un elemento table para la tabla
    const tabla = document.createElement("table");
    tabla.classList.add("table");

    // Crear el encabezado de la tabla
    const encabezado = document.createElement("thead");
    const filaEncabezado = document.createElement("tr");

    // Crear las celdas de encabezado
    const nombreJugadorEncabezado = document.createElement("th");
    nombreJugadorEncabezado.textContent = "Nombre Jugador";

    const tipoEstadisticaEncabezado = document.createElement("th");
    tipoEstadisticaEncabezado.textContent = "Tipo de Estadistica";

    const valorEncabezado = document.createElement("th");
    valorEncabezado.textContent = "Valor";

    // Agregar las celdas de encabezado a la fila de encabezado
    filaEncabezado.appendChild(nombreJugadorEncabezado);
    filaEncabezado.appendChild(tipoEstadisticaEncabezado);
    filaEncabezado.appendChild(valorEncabezado);

    // Agregar la fila de encabezado al encabezado de la tabla
    encabezado.appendChild(filaEncabezado);

    // Crear el cuerpo de la tabla
    const cuerpoTabla = document.createElement("tbody");

    // Función para agregar una fila a la tabla
    function agregarFila(nombreJugador, tipoEstadistica, valor) {
        const fila = document.createElement("tr");

        const celdaNombreJugador = document.createElement("td");
        celdaNombreJugador.textContent = nombreJugador;

        const celdaTipoEstadistica = document.createElement("td");
        celdaTipoEstadistica.textContent = tipoEstadistica;

        const celdaValor = document.createElement("td");
        celdaValor.textContent = valor;

        fila.appendChild(celdaNombreJugador);
        fila.appendChild(celdaTipoEstadistica);
        fila.appendChild(celdaValor);

        cuerpoTabla.appendChild(fila);
    }

    // Agregar las filas con los datos de los jugadores
    agregarFila(jugadorMejorPTS.player_name, "Puntos", jugadorMejorPTS.PTS);
    agregarFila(jugadorMejorAST.player_name, "Asistencias", jugadorMejorAST.AST);
    agregarFila(jugadorMejorBLK.player_name, "Bloqueos", jugadorMejorBLK.BLK);
    agregarFila(jugadorMejorSTL.player_name, "Robos", jugadorMejorSTL.STL);
    agregarFila(jugadorMejorDRB.player_name, "Rebotes Defensivos", jugadorMejorDRB.DRB);
    agregarFila(jugadorMejorORB.player_name, "Rebotes Ofensivos", jugadorMejorORB.ORB);
    agregarFila(jugadorMejorTOV.player_name, "Perdidas", jugadorMejorTOV.TOV);
    agregarFila(jugadorMejorEdad.player_name, "Edad", jugadorMejorEdad.age);
    agregarFila(jugadorMejorTRB.player_name, "Rebotes Totales", jugadorMejorTRB.TRB);
    agregarFila(jugadorMasMinutos.player_name, "Minutos Jugados", jugadorMasMinutos.minutes_played);
    agregarFila(jugadorMejorPorcentaje2.player_name, "Porcentaje de Tiros de 2", jugadorMejorPorcentaje2.two_percent * 100 + "%");
    agregarFila(jugadorMejorPorcentaje3.player_name, "Porcentaje de Tiros de 3", jugadorMejorPorcentaje3.three_percent * 100 + "%");

    // Agregar el encabezado y el cuerpo de la tabla a la tabla
    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    // Crear un elemento div para contener la tabla
    const contenidoDiv = document.createElement("div");
    contenidoDiv.appendChild(tabla);

    return contenidoDiv;
}
