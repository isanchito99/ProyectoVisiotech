//ARRAY DONDE SE ALMACENA LOS JUGADORES
let listaJugadores = [];
let jugadoresPorEquipo = {};
window.onload = async function () {
  listaJugadores = await llamarApiTodasLasPaginas();
  // Llamar a jugadoresEquipo después de cargar la lista de jugadores
  jugadoresPorEquipo = jugadoresEquipo();
  mostrarEquiposConJugadores();

}

const equipos = [
  {
    name: 'Hawks',
    data: {
      nombre: 'Atlanta Hawks',
      estadio: 'State Farm Arena',
      img: "img/equipos/hawks.png",
      acronimo: 'ATL',
      conferencia: 'Este'

    }
  },
  {
    name: 'Celtics',
    data: {
      nombre: 'Boston Celtics',
      estadio: 'TD Garden',
      img: "img/equipos/boston.png",
      acronimo: 'BOS',
      conferencia: 'Este'
    }
  },
  {
    name: 'Nets',
    data: {
      nombre: 'Brooklyn Nets',
      estadio: 'Barclays Center',
      img: "img/equipos/nets.png",
      acronimo: 'BRK',
      conferencia: 'Este'
    }
  },
  {
    name: 'Hornets',
    data: {
      nombre: 'Charlotte Hornets',
      estadio: 'Spectrum Center',
      img: "img/equipos/hornets.png",
      acronimo: 'CHO',
      conferencia: 'Este'
    }
  },
  {
    name: 'Bulls',
    data: {
      nombre: 'Chicago Bulls',
      estadio: 'United Center',
      img: "img/equipos/bulls.png",
      acronimo: 'CHI',
      conferencia: 'Este'
    }
  },
  {
    name: 'Cavaliers',
    data: {
      nombre: 'Cleveland Cavaliers',
      estadio: 'Rocket Mortgage FieldHouse',
      img: "img/equipos/cavaliers.png",
      acronimo: 'CLE',
      conferencia: 'Este'
    }
  },
  {
    name: 'Mavericks',
    data: {
      nombre: 'Dallas Mavericks',
      estadio: 'American Airlines Center',
      img: "img/equipos/mavericks.png",
      acronimo: 'DAL',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Nuggets',
    data: {
      nombre: 'Denver Nuggets',
      estadio: 'Ball Arena',
      img: "img/equipos/nuggets.png",
      acronimo: 'DEN',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Pistons',
    data: {
      nombre: 'Detroit Pistons',
      estadio: 'Little Caesars Arena',
      img: "img/equipos/pistons.png",
      acronimo: 'DET',
      conferencia: 'Este'
    }
  },
  {
    name: 'Warriors',
    data: {
      nombre: 'Golden State Warriors',
      estadio: 'Chase Center',
      img: "img/equipos/warriors.png",
      acronimo: 'GSW',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Rockets',
    data: {
      nombre: 'Houston Rockets',
      estadio: 'Toyota Center',
      img: "img/equipos/rockets.png",
      acronimo: 'HOU',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Pacers',
    data: {
      nombre: 'Indiana Pacers',
      estadio: 'Bankers Life Fieldhouse',
      img: "img/equipos/pacers.png",
      acronimo: 'IND',
      conferencia: 'Este'
    }
  },

  {
    name: 'Clippers',
    data: {
      nombre: 'Los Angeles Clippers',
      estadio: 'Crypto.com Arena',
      img: "img/equipos/clippers.png",
      acronimo: 'LAC',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Lakers',
    data: {
      nombre: 'Los Angeles Lakers',
      estadio: 'Crypto.com Arena',
      img: "img/equipos/lakers.png",
      acronimo: 'LAL',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Grizzlies',
    data: {
      nombre: 'Memphis Grizzlies',
      estadio: 'FedExForum',
      img: "img/equipos/grizzlies.png",
      acronimo: 'MEM',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Heat',
    data: {
      nombre: 'Miami Heat',
      estadio: 'FTX Arena',
      img: "img/equipos/heat.png",
      acronimo: 'MIA',
      conferencia: 'Este'
    }
  },
  {
    name: 'Bucks',
    data: {
      nombre: 'Milwaukee Bucks',
      estadio: 'Fiserv Forum',
      img: "img/equipos/bucks.png",
      acronimo: 'MIL',
      conferencia: 'Este'
    }
  },
  {
    name: 'Timberwolves',
    data: {
      nombre: 'Minnesota Timberwolves',
      estadio: 'Target Center',
      img: "img/equipos/timberwolves.png",
      acronimo: 'MIN',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Pelicans',
    data: {
      nombre: 'New Orleans Pelicans',
      estadio: 'Pelicans Stadium',
      img: "img/equipos/pelicans.png",
      acronimo: 'NOP',
      conferencia: 'Este'
    }
  },

  {
    name: 'Knicks',
    data: {
      nombre: 'New York Knicks',
      estadio: 'Madison Square Garden',
      img: "img/equipos/knicks.png",
      acronimo: 'NYK',
      conferencia: 'Este'
    }
  },
  {
    name: 'Thunder',
    data: {
      nombre: 'Oklahoma City Thunder',
      estadio: 'Paycom Center',
      img: "img/equipos/thunder.png",
      acronimo: 'OKC',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Magic',
    data: {
      nombre: 'Orlando Magic',
      estadio: 'Amway Center',
      img: "img/equipos/magic.png",
      acronimo: 'ORL',
      conferencia: 'Este'
    }
  },
  {
    name: '76ers',
    data: {
      nombre: 'Philadelphia 76ers',
      estadio: 'Wells Fargo Center',
      img: "img/equipos/76ers.png",
      acronimo: 'PHI',
      conferencia: 'Este'
    }
  },
  {
    name: 'Suns',
    data: {
      nombre: 'Phoenix Suns',
      estadio: 'Footprint Center',
      img: "img/equipos/suns.png",
      acronimo: 'PHO',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Blazers',
    data: {
      nombre: 'Portland Trail Blazers',
      estadio: 'Footprint Center',
      img: "img/equipos/blazers.png",
      acronimo: 'POR',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Kings',
    data: {
      nombre: 'Sacramento Kings',
      estadio: 'Golden 1 Center',
      img: "img/equipos/kings.png",
      acronimo: 'SAC',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Spurs',
    data: {
      nombre: 'San Antonio Spurs',
      estadio: 'Frost Bank Center',
      img: "img/equipos/spurs.png",
      acronimo: 'SAS',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Raptors',
    data: {
      nombre: 'Toronto Raptors',
      estadio: 'Scotiabank Arena',
      img: "img/equipos/raptors.png",
      acronimo: 'TOR',
      conferencia: 'Este'
    }
  },
  {
    name: 'Jazz',
    data: {
      nombre: 'Utah Jazz',
      estadio: 'Vivint Arena',
      img: "img/equipos/jazz.png",
      acronimo: 'UTA',
      conferencia: 'Oeste'
    }
  },
  {
    name: 'Wizards',
    data: {
      nombre: 'Washington Wizards',
      estadio: 'Capital One Arena',
      img: "img/equipos/wizards.png",
      acronimo: 'WAS',
      conferencia: 'Este'
    }
  }

];
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

function jugadoresEquipo() {
  // Crear un objeto para almacenar a los jugadores por equipo.
  const jugadoresPorEquipo = {};

  // Iterar a través de la lista de jugadores.
  listaJugadores.forEach((jugador) => {
    const equipoAcronimo = jugador.team;

    // Comprobar si ya existe un array para este equipo en el objeto.
    if (!jugadoresPorEquipo[equipoAcronimo]) {
      jugadoresPorEquipo[equipoAcronimo] = [];
    }

    // Agregar el jugador al array correspondiente al equipo.
    jugadoresPorEquipo[equipoAcronimo].push(jugador);
  });
  console.log(jugadoresPorEquipo)

  // El objeto jugadoresPorEquipo ahora contiene a los jugadores agrupados por equipo.
  return jugadoresPorEquipo;
}


// Función para mostrar equipos con sus jugadores
function mostrarEquiposConJugadores() {
  // Llamar a la función jugadoresEquipo para agrupar jugadores por equipo
  const jugadoresPorEquipo = jugadoresEquipo();

  // Iterar a través de la lista de equipos y mostrarlos con sus jugadores
  equipos.forEach((equipo) => {
    const equipoAcronimo = equipo.data.acronimo;
    const jugadoresEquipo = jugadoresPorEquipo[equipoAcronimo];

    // Mostrar el nombre del equipo en la consola
    //console.log(`Equipo: ${equipo.data.nombre}`);

    // Mostrar los jugadores del equipo en la consola
    if (jugadoresEquipo) {
      jugadoresEquipo.forEach((jugador) => {
      //  console.log(`Jugador: ${jugador.player_name}`);
      });
    } else {
      console.log("No hay jugadores para este equipo.");
    }
  });
}


document.addEventListener("DOMContentLoaded", function () {

  const equiposList = document.getElementById("equipos-list");

  // Itera a través del array de equipos utilizando forEach.
  equipos.forEach((equipo) => {
    // Crea un elemento div llamado "equipoColumn" para contener la tarjeta del equipo y aplica clases de Bootstrap.
    const equipoColumn = document.createElement("div");
    equipoColumn.classList.add("col-md-4", "col-sm-5", "mt-4");

    // Crea un elemento div llamado "card" para representar la tarjeta del equipo y aplica clases de Bootstrap.
    const card = document.createElement("div");
    card.classList.add("card", "tamañoCards");
    card.classList.add("col");

    // Crea un elemento img llamado "img" para mostrar la imagen del equipo y establece la fuente (src) y clases de Bootstrap.
    const img = document.createElement("img");
    img.src = equipo.data.img;
    img.classList.add("card-img-top", "imagenesEquipos", "hover-zoom");
    img.alt = equipo.data.nombre;

    // Crea un elemento div llamado "cardBody" para contener el título y la información del equipo y aplica clases de Bootstrap.
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    // Crea un elemento h5 llamado "cardTitle" para mostrar el nombre del equipo en negrita.
    const cardTitle = document.createElement("h5");
    cardTitle.classList.add("card-title");
    cardTitle.textContent = equipo.data.nombre;
    cardTitle.style.fontWeight = "bold";

    // Crea elementos p para mostrar el estadio y la conferencia del equipo.
    const cardTextEstadio = document.createElement("p");
    const cardTextConferencia = document.createElement("p");
    cardTextEstadio.textContent = `Estadio: ${equipo.data.estadio}`;
    cardTextConferencia.textContent = `Conferencia: ${equipo.data.conferencia}`;

    // Agrega los elementos al árbol DOM para construir la estructura de la tarjeta.
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardTextEstadio);
    cardBody.appendChild(cardTextConferencia);
    card.appendChild(img);
    card.appendChild(cardBody);
    equipoColumn.appendChild(card);

    // Agregar un event listener para redirigir al usuario al hacer clic en la tarjeta del equipo.
    card.addEventListener("click", function () {
      // Obtener el acrónimo del equipo seleccionado.
      const equipoAcronimo = equipo.data.acronimo;
      
      // Filtrar los jugadores del equipo seleccionado.
      const jugadoresEquipo = jugadoresPorEquipo[equipoAcronimo];
    
      // Verificar si hay jugadores en el equipo seleccionado.
      if (jugadoresEquipo) {
        // Convertir la lista de jugadores a una cadena JSON y codificarla.
        const jugadoresJSON = JSON.stringify(jugadoresEquipo);
        const jugadoresParametro = encodeURIComponent(jugadoresJSON);
        const imagenEquipo=equipo.data.img;
         // Redirigir a la página de estadísticas del equipo con los jugadores y la imagen como parámetros.
    window.location.href = `estadisticaEquipos.html?equipo=${equipoAcronimo}&jugadores=${jugadoresParametro}&imagen=${imagenEquipo}`;

      }
    });

    // Agrega la tarjeta a la lista de equipos representada por "equiposList".
    equiposList.appendChild(equipoColumn);
  });
});

