let wheel = document.querySelector("#wheel");
let button = document.querySelector("#spin");
let showContainer = document.querySelector(".popup-container");
let preguntaIndex; // Variable global para almacenar el índice de la pregunta actual

// Usar los puntos que el servidor envió al cargar la página
let puntos = parseInt(document.getElementById("puntos").innerText.split(": ")[1]);


button.addEventListener("click", spinWheel);

const preguntas = [
  { pregunta: "¿Cuál es la capital de Francia?", respuestas: ["París", "Londres", "Berlín", "Madrid"], correcta: 0 },
  { pregunta: "¿Cuál es el planeta más grande del sistema solar?", respuestas: ["Marte", "Venus", "Júpiter", "Saturno"], correcta: 2 },
  { pregunta: "¿Qué animal es conocido como el 'Rey de la Selva'?", respuestas: ["Tigre", "León", "Elefante", "Gorila"], correcta: 1 },
  { pregunta: "¿Qué elemento químico tiene el símbolo 'O'?", respuestas: ["Oro", "Oxígeno", "Osmio", "Oxalato"], correcta: 1 },
  { pregunta: "¿Cuál es el río más largo del mundo?", respuestas: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"], correcta: 0 },
  { pregunta: "¿Cuál es el océano más grande del mundo?", respuestas: ["Atlántico", "Pacífico", "Índico", "Ártico"], correcta: 1 },
  { pregunta: "¿Quién escribió 'Don Quijote de la Mancha'?", respuestas: ["Miguel de Cervantes", "William Shakespeare", "Gabriel García Márquez", "Jorge Luis Borges"], correcta: 0 },
  { pregunta: "¿Cuál es el país con la mayor población del mundo?", respuestas: ["India", "Estados Unidos", "China", "Brasil"], correcta: 2 },
  { pregunta: "¿Cuál es el órgano más grande del cuerpo humano?", respuestas: ["Cerebro", "Hígado", "Piel", "Corazón"], correcta: 2 },
  { pregunta: "¿En qué continente se encuentra Egipto?", respuestas: ["Asia", "África", "Europa", "América"], correcta: 1 },
  { pregunta: "¿Cuál es el metal más abundante en la corteza terrestre?", respuestas: ["Hierro", "Cobre", "Aluminio", "Plata"], correcta: 2 },
  { pregunta: "¿Qué tipo de animal es la ballena?", respuestas: ["Pez", "Anfibio", "Mamífero", "Reptil"], correcta: 2 }
];
//aqui esta la ruleta 
function spinWheel(evt) {
  let spin = Math.round(Math.random() * 2220);
  wheel.style.transition = "ease 3s";
  wheel.style.transform = "rotate(" + spin + "deg)";

  preguntaIndex = Math.floor(((spin % 360) / 30)); // Cada pregunta ocupa 30 grados
  mostrarPregunta(preguntaIndex);
}

function mostrarPregunta(index) {
  const preguntaData = preguntas[index];
  const popupBox = document.querySelector(".popup-box");
  
  // Actualiza el contenido del popup
  popupBox.innerHTML = `
    <h1>Pregunta </h1>
    <p>${preguntaData.pregunta}</p>
    <ul>
      ${preguntaData.respuestas.map((respuesta, i) =>
        `<li>${String.fromCharCode(65 + i)}: ${respuesta}</li>`
      ).join('')}
    </ul>
    <p>Presiona A, B, C o D para seleccionar tu respuesta</p>
    <button class="close-btn">Cerrar</button>
  `;

  // Muestra la ventana emergente
  setTimeout(() => {
    showContainer.classList.add("active");
    // Añade el evento de teclado para seleccionar respuestas
    document.addEventListener("keydown", handleKeyPress);
  }, 3000);

  // Cierra la ventana emergente cuando se hace clic en el botón de cerrar
  document.querySelector(".close-btn").onclick = cerrarPopup;
}

function handleKeyPress(event) {
  const key = event.key.toUpperCase();
  const validKeys = ['A', 'B', 'C', 'D'];
  if (validKeys.includes(key)) {
    const respuestaIndex = validKeys.indexOf(key);
    verificarRespuesta(respuestaIndex, preguntaIndex);
  } else {
    console.log("Tecla no válida:", key);
  }
}

function verificarRespuesta(respuestaIndex, preguntaIndex) {
  const preguntaData = preguntas[preguntaIndex];

  // Cerrar el popup inmediatamente después de verificar la respuesta
  cerrarPopup();

  if (respuestaIndex === preguntaData.correcta) {
    puntos += 10; // Añadir 10 puntos por cada respuesta correcta
    document.getElementById("puntos").innerText = "Puntos: " + puntos;

    // Enviar los puntos actualizados al servidor para almacenarlos en la base de datos
    fetch('/actualizar-puntos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'CSRF-Token': csrfToken // Asegúrate de manejar el token CSRF si es necesario
      },
      body: JSON.stringify({ puntos: puntos })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data.message); // Verificar que el mensaje de éxito se muestra en la consola
    })
    .catch(error => {
      console.error('Error al actualizar los puntos:', error);
    });

  } else {
    alert("Incorrecto. La respuesta correcta es " + preguntaData.respuestas[preguntaData.correcta]);
  }
}

function cerrarPopup() {
  console.log("Cerrando popup...");
  showContainer.classList.remove("active");
  document.removeEventListener("keydown", handleKeyPress);
}


