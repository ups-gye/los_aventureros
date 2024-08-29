function agregar_preg(){
    var table = document.getElementById('table');
    var preguntaInput = document.getElementById('pregunta');
    var op1Input = document.getElementById('op1');
    var op2Input = document.getElementById('op2');
    var op3Input = document.getElementById('op3');
    var op4Input = document.getElementById('op4');

    var tr = document.createElement('tr');
    var tr1 = document.createElement('tr');
    var tr2 = document.createElement('tr');
    var tr3 = document.createElement('tr');
    var tr4 = document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr1.appendChild(document.createElement('td'));
    var td3 = tr2.appendChild(document.createElement('td'));
    var td4 = tr3.appendChild(document.createElement('td'));
    var td5 = tr4.appendChild(document.createElement('td'));

    // Crea nodos de texto con los valores de los inputs
    var preguntaText = document.createTextNode(preguntaInput.value);
    var op1Text = document.createTextNode(op1Input.value);
    var op2Text = document.createTextNode(op2Input.value);
    var op3Text = document.createTextNode(op3Input.value);
    var op4Text = document.createTextNode(op4Input.value);

    // Añade los nodos de texto a las celdas correspondientes
    td1.appendChild(preguntaText);
    td2.appendChild(op1Text);
    td3.appendChild(op2Text);
    td4.appendChild(op3Text);
    td5.appendChild(op4Text);

    // Añade la fila a la tabla
    table.appendChild(tr);

    // Limpia los campos de entrada después de agregar la pregunta
    preguntaInput.value = '';
    op1Input.value = '';
    op2Input.value = '';
    op3Input.value = '';
    op4Input.value = '';
}
