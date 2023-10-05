const url = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';
const url2 = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023/?page=2';
let listaJugadores = [];

window.onload = async function () {

    listaJugadores = await llamarApi();
    encontrarMejorJugador(listaJugadores);
    encontrarPeorJugador(listaJugadores);
   
    

    console.log(listaJugadores);

    listaJugadores.results.forEach(jugador => {
        console.log(jugador.player_name+" Edad : "+jugador.age+" PTS : "+jugador.PTS+" AST : "+jugador.AST+" BLK : "+jugador.BLK+" STL : "+jugador.STL+" DRB : "+jugador.DRB+" Partidos jugados: "+jugador.games);
    });

}

async function llamarApi() {

    return await fetch(url)
        .then(res => res.json())
        .then(data => {
            return data;
        })
        .catch(error => console.log(error));

}

async function llamarApiTodasLasPaginas() {
    const urlBase = 'https://nba-stats-db.herokuapp.com/api/playerdata/season/2023';
    const listaJugadores = [];

    let currentPage = 2;
    let totalPages = 7;

    while (currentPage <= totalPages) {
        const url = `${urlBase}/?page=${currentPage}`;
        const data = await llamarApi(url);

        if (data.results) {
            listaJugadores.push(...data.results);
        }

        if (data.pages && data.pages.total) {
            totalPages = data.pages.total;
        }

        currentPage++;
    }

    return listaJugadores;
}

function buscarJugador() {
    const inputNombre = document.getElementById('nombre').value;
    const jugadorEncontrado = listaJugadores.results.find(jugador => jugador.player_name.toLowerCase() === inputNombre.toLowerCase());
    const jugadorEncontradoElement = document.getElementById('jugadorEncontrado');
    const datosJugadorEncontrado = document.getElementById('datosJugador');
    if (jugadorEncontrado) {
        jugadorEncontradoElement.textContent = `El jugador ${jugadorEncontrado.player_name} está en la lista.`;
        datosJugadorEncontrado.textContent = `Los datos de  ${jugadorEncontrado.player_name} son:\n EDAD:${jugadorEncontrado.age},
        \n PUNTOS:${jugadorEncontrado.PTS},\n ASISTENCIAS:${jugadorEncontrado.AST},\n 
        TAPONES:${jugadorEncontrado.BLK}, \nROBOS:${jugadorEncontrado.STL}, 
        \nREGATES:${jugadorEncontrado.DRB},\n PARTIDOS JUGADOS:${jugadorEncontrado.games} `;
        //console.log(`El jugador ${jugadorEncontrado.player_name} está en la lista.`);
    } else {
        window.alert("El jugador no se encuentra en el JSON");
        inputNombre.value = '';
        window.location.reload();
     //console.log(`El jugador ${inputNombre} no se encuentra en la lista.`);
    }
}

function encontrarMejorJugador(jugadores) {
    let jugadorMejorPTS = null;
    let jugadorMejorAST = null;
    let jugadorMejorBLK = null;
    let jugadorMejorSTL = null;
    let jugadorMejorDRB = null;
    let jugadorMejorORB = null;
    let jugadorMejorTRRB = null;
    let jugadorMejorTOV=null;
    let jugadorMejorEdad=null;
    let jugadorMejorTRB=null;
    let jugadorMasMinutos=null;
    let jugadorMejorPorcentaje2=null;
    let jugadorMejorPorcentaje3=null; 

    jugadores.results.forEach(jugador => {
        if (!jugadorMejorPTS || jugador.PTS > jugadorMejorPTS.PTS) {
            jugadorMejorPTS = jugador;
        }

        if (!jugadorMejorAST || jugador.AST > jugadorMejorAST.AST) {
            jugadorMejorAST = jugador;
        }

        if (!jugadorMejorPTS || jugador.PTS > jugadorMejorPTS.PTS) {
            jugadorMejorPTS = jugador;
        }
    });

    console.log(`El jugador con más puntos es: ${jugadorMejorPTS.player_name} con ${jugadorMejorPTS.PTS} puntos.`);
    console.log(`El jugador con más asistencias es: ${jugadorMejorAST.player_name} con ${jugadorMejorAST.AST} asistencias.`);
}

function encontrarPeorJugador(jugadores) {
    let jugadorPeorPTS = null;
    let jugadorPeorAST = null;
    let jugadorPeorBLK = null;
    let jugadorPeorSTL = null;
    let jugadorPeorDRB = null;
    let jugadorPeorORB = null;
    let jugadorMejorTRRB = null;
    let jugadorPeorTOV=null;
    let jugadorPeorEdad=null;
    let jugadorPeorTRB=null;
    let jugadorMenosMinutos=null;
    let jugadorPeorPorcentaje2=null;
    let jugadorPeorPorcentaje3=null; 

    jugadores.results.forEach(jugador => {
        if (!jugadorPeorPTS || jugador.PTS < jugadorPeorPTS.PTS && jugadorPeorPTS.games>10) {
            jugadorPeorPTS = jugador;
        }

        if (!jugadorPeorAST || jugador.AST < jugadorPeorAST.AST && jugadorPeorPTS.games>10) {
            jugadorPeorAST = jugador;
        }
    });

    console.log(`El jugador con menos puntos es: ${jugadorPeorPTS.player_name} con ${jugadorPeorPTS.PTS} puntos.`);
    console.log(`El jugador con menos asistencias es: ${jugadorPeorAST.player_name} con ${jugadorPeorAST.AST} asistencias.`);
}



 

