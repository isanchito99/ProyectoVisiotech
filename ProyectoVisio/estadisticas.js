
//const url = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';
//const url2 = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/?page=2';
let listaJugadores = [];
window.onload = async function () {
    // Mostrar la pantalla de espera
    const loadingDiv = document.getElementById("loading");
    loadingDiv.style.display = "block";
    listaJugadores = await llamarApiTodasLasPaginas();
    encontrarMejorJugador(listaJugadores);
    encontrarPeorJugador(listaJugadores);
    // Ocultar la pantalla de espera y mostrar la tabla
    loadingDiv.style.display = "none";
    
}

function encontrarMejorJugador(jugadores) {
    console.log(jugadores);
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
    let jugadorConMenosFaltas = null;
    let jugadorConMasPartidos = null;
    let jugadorConMasPartidosTitular = null;
    //Variable para la tabla
    let encabezadoMejor = "Mejores Estadisticas 2022-2023";

    jugadores.forEach(jugador => {
        //JUGADOR CON MÁS PUNTOS
        if (!jugadorMejorPTS || jugador.PTS > jugadorMejorPTS.PTS && jugadorMejorPTS.minutes_played > 200) {
            jugadorMejorPTS = jugador;
        }
        //JUGADOR CON MÁS ASISTENCIAS
        if (!jugadorMejorAST || jugador.AST > jugadorMejorAST.AST && jugadorMejorAST.minutes_played > 200) {
            jugadorMejorAST = jugador;
        }
        //JUGADOR CON MÁS BLOQUEOS
        if (!jugadorMejorBLK || jugador.BLK > jugadorMejorBLK.BLK && jugadorMejorBLK.minutes_played > 200) {
            jugadorMejorBLK = jugador;
        }
        //JUGADOR CON MÁS ROBOS DE BALÓN
        if (!jugadorMejorSTL || jugador.STL > jugadorMejorSTL.STL && jugadorMejorSTL.minutes_played > 200) {
            jugadorMejorSTL = jugador;
        }
        //JUGADOR CON MAS REBOTES DEFENSIVOS
        if (!jugadorMejorDRB || jugador.DRB > jugadorMejorDRB.DRB && jugadorMejorDRB.minutes_played > 200) {
            jugadorMejorDRB = jugador;
        }
        //JUGADOR CON MAS REBOTES OFENSIVOS
        if (!jugadorMejorORB || jugador.ORB > jugadorMejorORB.ORB && jugadorMejorORB.minutes_played > 200) {
            jugadorMejorORB = jugador;
        }
        //JUGADOR CON MENOS PERDIDAS
        if (!jugadorMejorTOV || jugador.TOV < jugadorMejorTOV.TOV && jugadorMejorTOV.minutes_played > 200) {
            jugadorMejorTOV = jugador;
        }
        //JUGADOR CON MENOS AÑOS
        if (!jugadorMejorEdad || jugador.age < jugadorMejorEdad.age) {
            jugadorMejorEdad = jugador;
        }
        //JUGADOR CON MAS REBOTES TOTALES
        if (!jugadorMejorTRB || jugador.TRB > jugadorMejorTRB.TRB && jugadorMejorTRB.minutes_played > 200) {
            jugadorMejorTRB = jugador;
        }
        //JUGADOR CON MÁS MINUTOS JUGADOS
        if (!jugadorMasMinutos || jugador.minutes_played > jugadorMasMinutos.minutes_played && jugadorMasMinutos.minutes_played > 200) {
            jugadorMasMinutos = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 2
        if (!jugadorMejorPorcentaje2 || jugador.two_percent > jugadorMejorPorcentaje2.two_percent && jugadorMejorPorcentaje2.two_attempts > 50) {
            jugadorMejorPorcentaje2 = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 3
        if (!jugadorMejorPorcentaje3 || jugador.three_percent > jugadorMejorPorcentaje3.three_percent && jugadorMejorPorcentaje3.three_attempts > 50) {
            jugadorMejorPorcentaje3 = jugador;
        }
        //JUGADOR CON  MENOS FALTAS PERSONALES
        if (!jugadorConMenosFaltas || jugador.PF < jugadorConMenosFaltas.PF && jugadorConMenosFaltas.minutes_played > 200) {
            jugadorConMenosFaltas = jugador;
        }
        //JUGADOR CON  MAS PARTIDOS JUGADOS
        if (!jugadorConMasPartidos || jugador.games > jugadorConMasPartidos.games) {
            jugadorConMasPartidos = jugador;
        }
        //JUGADOR CON  MAS PARTIDOS TITULARES JUGADOS
        if (!jugadorConMasPartidosTitular || jugador.games_started > jugadorConMasPartidosTitular.games_started) {
            jugadorConMasPartidosTitular = jugador;
        }

    });


    const contenidoHTML = generarContenidoHTML(jugadorMejorPTS, jugadorMejorAST,
        jugadorMejorBLK, jugadorMejorSTL, jugadorMejorDRB, jugadorMejorORB, jugadorMejorTOV, jugadorMejorEdad,
        jugadorMejorTRB, jugadorMasMinutos, jugadorMejorPorcentaje2, jugadorMejorPorcentaje3, jugadorConMenosFaltas, jugadorConMasPartidos, jugadorConMasPartidosTitular, encabezadoMejor);


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
    let jugadorMasFaltas = null;
    let jugadorMenosPartidos = null;
    let jugadorMenosTitularidades = null;
    //Variable para la tabla
    let encabezadoPeor = "Peores Estadísticas 2022-2023";

    jugadores.forEach(jugador => {
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
        if (!jugadorPeorDRB || jugador.DRB < jugadorPeorDRB.DRB && jugadorPeorDRB.minutes_played > 200) {
            jugadorPeorDRB = jugador;
        }
        //JUGADOR CON MAS REBOTES OFENSIVOS
        if (!jugadorPeorORB || jugador.ORB < jugadorPeorORB.ORB && jugadorPeorORB.minutes_played > 200) {
            jugadorPeorORB = jugador;
        }
        //JUGADOR CON MENOS PERDIDAS
        if (!jugadorPeorTOV || jugador.TOV > jugadorPeorTOV.TOV && jugadorPeorTOV.minutes_played > 200) {
            jugadorPeorTOV = jugador;
        }
        //JUGADOR CON MENOS AÑOS
        if (!jugadorPeorEdad || jugador.age > jugadorPeorEdad.age) {
            jugadorPeorEdad = jugador;
        }
        //JUGADOR CON MAS REBOTES TOTALES
        if (!jugadorPeorTRB || jugador.TRB < jugadorPeorTRB.TRB && jugadorPeorTRB.minutes_played > 200) {
            jugadorPeorTRB = jugador;
        }
        //JUGADOR CON MÁS MINUTOS JUGADOS
        if (!jugadorMenosMinutos || jugador.minutes_played < jugadorMenosMinutos.minutes_played && jugadorMenosMinutos.minutes_played > 200) {
            jugadorMenosMinutos = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 2
        if (!jugadorPeorPorcentaje2 || jugador.two_percent < jugadorPeorPorcentaje2.two_percent && jugadorPeorPorcentaje2.field_attempts > 50) {
            jugadorPeorPorcentaje2 = jugador;
        }
        //JUGADOR CON  MEJOR PORCENTAJE DE TIROS DE 3
        if (!jugadorPeorPorcentaje3 || jugador.three_percent < jugadorPeorPorcentaje3.three_percent && jugadorPeorPorcentaje3.field_attempts > 50) {
            jugadorPeorPorcentaje3 = jugador;
        }
        //JUGADOR CON MÁS FALTAS PERSONALES
        if (!jugadorMasFaltas || jugador.PF > jugadorMasFaltas.PF && jugadorMasFaltas.minutes_played > 200) {
            jugadorMasFaltas = jugador;
        }
        //JUGADOR CON  MENOS PARTIDOS JUGADOS
        if (!jugadorMenosPartidos || jugador.games < jugadorMenosPartidos.games) {
            jugadorMenosPartidos = jugador;
        }
        //JUGADOR CON  MENOS PARTIDOS JUGADOS COMO TITULAR
        if (!jugadorMenosTitularidades || jugador.games_started < jugadorMenosTitularidades.games_started) {
            jugadorMenosTitularidades = jugador;
        }
    });



    const contenidoHTML = generarContenidoHTML(jugadorPeorPTS, jugadorPeorAST,
        jugadorPeorBLK, jugadorPeorSTL, jugadorPeorDRB, jugadorPeorORB, jugadorPeorTOV, jugadorPeorEdad,
        jugadorPeorTRB, jugadorMenosMinutos, jugadorPeorPorcentaje2, jugadorPeorPorcentaje3, jugadorMasFaltas, jugadorMenosPartidos, jugadorMenosTitularidades, encabezadoPeor);

    const contenedorResultados = document.querySelector("#resultados2");
    console.log(contenedorResultados);

    // Agregar el contenido HTML al elemento contenedor
    contenedorResultados.appendChild(contenidoHTML);
}

async function llamarApiTodasLasPaginas() {
    const urlBase = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';

    const firstData = await llamarApi(urlBase);
    listaJugadores.push(...firstData.results);

    console.log(await llamarApi(urlBase));
    let currentPage = 2;
    let totalPages = 7;

    while (currentPage <= totalPages) {
        const url = `${urlBase}/?page=${currentPage}`;
        console.log(listaJugadores.length);
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

async function llamarApi(url) {

    return await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(error => console.log(error));

}



function generarContenidoHTML(jugadorMejorPTS, jugadorMejorAST, jugadorMejorBLK, jugadorMejorSTL, jugadorMejorDRB, jugadorMejorORB, jugadorMejorTOV, jugadorMejorEdad,
    jugadorMejorTRB, jugadorMasMinutos, jugadorMejorPorcentaje2, jugadorMejorPorcentaje3, jugadorConMenosFaltas, jugadorConMasPartidos, jugadorConMasPartidosTitular, textoEncabezado) {
    // Crear un elemento table para la tabla
    const tabla = document.createElement("table");
    tabla.classList.add("table", "table-light", "table-hover", "table-striped");
    // Crear una celda de encabezado con colspan
    const encabezadoTabla = document.createElement("th");
    encabezadoTabla.textContent = textoEncabezado;
    encabezadoTabla.setAttribute("colspan", 3); // Agregar el atributo colspa
    encabezadoTabla.style.textAlign = "center";
    const filaTablaInicial = document.createElement("tr");
    filaTablaInicial.appendChild(encabezadoTabla);
    // Crear el encabezado de la tabla
    const encabezado = document.createElement("thead");
    encabezado.classList.add("thead-dark");
    const filaEncabezado = document.createElement("tr");
    filaEncabezado.classList.add("oscuridad");
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
    encabezado.appendChild(filaTablaInicial);
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
    agregarFila(jugadorConMenosFaltas.player_name, "Faltas Personales", jugadorConMenosFaltas.PF);
    agregarFila(jugadorConMasPartidos.player_name, "Partidos jugados", jugadorConMasPartidos.games);
    agregarFila(jugadorConMasPartidosTitular.player_name, "Titularidades", jugadorConMasPartidosTitular.games_started);
    // Agregar el encabezado y el cuerpo de la tabla a la tabla
    tabla.appendChild(encabezado);
    tabla.appendChild(cuerpoTabla);

    // Crear un elemento div para contener la tabla
    const contenidoDiv = document.createElement("div");
    contenidoDiv.appendChild(tabla);

    return contenidoDiv;
}
