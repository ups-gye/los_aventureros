function agregar_est(){
    var table = document.getElementById('table')
    var nombre = document.getElementById("nombre")
    var apellido = document.getElementById("apellido")
    var curso = document.getElementById("curso")

      // Validar que los campos no estén vacíos
      if (nombre.value === '' || apellido.value === '' || curso.value === '') {
        alert("Por favor, completa todos los campos antes de agregar el estudiante.");
        return;
    }

    var tr = document.createElement('tr')

    var td1 = tr.appendChild(document.createElement('td'))
    var td2 = tr.appendChild(document.createElement('td'))
    var td3 = tr.appendChild(document.createElement('td'))
    var td4 = tr.appendChild(document.createElement('td'))

    var nombreTexto = document.createTextNode(nombre.value)
    var apellidoTexto = document.createTextNode(apellido.value)
    var cursoTexto = document.createTextNode(curso.value)
    var puntoTexto = document.createTextNode('0')


    td1.appendChild(nombreTexto)
    td2.appendChild(apellidoTexto)
    td3.appendChild(cursoTexto)
    td4.appendChild(puntoTexto)

    table.appendChild(tr)

    //LIMPIA LOS CAMPOS DE ENTRADA
    nombre.value = ''
    apellido.value = ''
    curso.value = ''
}