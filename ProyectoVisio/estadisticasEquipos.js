 // Extraigo el parámetro de consulta de la URL
 const urlParams = new URLSearchParams(window.location.search);
 const equipoInfo = urlParams.get('equipoInfo');

 // Muestro la información del equipo en el párrafo
 const equipoInfoPara = document.getElementById('equipo-info');
 equipoInfoPara.textContent = equipoInfo;