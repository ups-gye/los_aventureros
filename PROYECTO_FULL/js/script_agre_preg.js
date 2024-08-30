function agregarPregunta() {
    var table = document.getElementById('table');
    var pregunta = document.getElementById("pregunta").value;
    var opcion1 = document.getElementById("op1").value;
    var opcion2 = document.getElementById("op2").value;
    var opcion3 = document.getElementById("op3").value;
    var opcion4 = document.getElementById("op4").value;

     // Validar que los campos no estén vacíos
     if (pregunta === '' || opcion1 === '' || opcion2 === '' || opcion3 === '' || opcion4 === '') {
        alert("Por favor, completa todos los campos antes de agregar la pregunta.");
        return;
    }

    // Crear una nueva fila para la pregunta
    var tr = document.createElement('tr');
    tr.className = "pregunta-row"; // Añadir clase para margen

    // Crear la celda de la pregunta
    var tdPregunta = document.createElement('td');
    tdPregunta.colSpan = 2;
    tdPregunta.textContent = pregunta;
    tdPregunta.style.textAlign = "center"; // Centrar el 
    tdPregunta.style.backgroundColor = "#ADD8E6"; // Color de fondo

    tr.appendChild(tdPregunta);

    // Añadir la fila a la tabla principal
    table.appendChild(tr);

    // Crear una nueva fila para las opciones
    var trOpciones = document.createElement('tr');
    trOpciones.className = "pregunta-row"; // Añadir clase para margen

    // Crear una celda para anidar la tabla de opciones
    var tdOpciones = document.createElement('td');
    tdOpciones.colSpan = 2;

    // Crear la tabla de opciones
    var tablaOpciones = document.createElement('table');
    tablaOpciones.style.width = "100%";
    tablaOpciones.style.textAlign = "center";
    tablaOpciones.border = "1";

    // Crear las filas de opciones
    var opcion1Row = tablaOpciones.insertRow();
    opcion1Row.insertCell(0).textContent = "1." + opcion1;
    
    var opcion2Row = tablaOpciones.insertRow();
    opcion2Row.insertCell(0).textContent = "2." + opcion2;
    
    var opcion3Row = tablaOpciones.insertRow();
    opcion3Row.insertCell(0).textContent = "3." + opcion3;
    
    var opcion4Row = tablaOpciones.insertRow();
    opcion4Row.insertCell(0).textContent = "4." + opcion4;

    // Añadir la tabla de opciones a la celda
    tdOpciones.appendChild(tablaOpciones);
    trOpciones.appendChild(tdOpciones);

    // Añadir la fila de opciones a la tabla principal
    table.appendChild(trOpciones);

    // Limpiar los campos de entrada
    document.getElementById("pregunta").value = '';
    document.getElementById("op1").value = '';
    document.getElementById("op2").value = '';
    document.getElementById("op3").value = '';
    document.getElementById("op4").value = '';
}

function eliminarUltimaPregunta() {
    var table = document.getElementById('table');
    var numRows = table.rows.length;

    // Verificar si hay suficientes filas para eliminar (dos filas por pregunta)
    if (numRows >= 2) {
        table.deleteRow(numRows - 1); // Eliminar la fila de opciones
        table.deleteRow(numRows - 2); // Eliminar la fila de la pregunta
    } else {
        alert("No hay preguntas para eliminar.");
    }
}