function agregar_est(){
    var table = document.getElementById('table')
    var nombre = document.getElementById("nombre")
    var apellido = document.getElementById("apellido")
    var curso = document.getElementById("curso")

    var tr = document.createElement('tr')
    // var td = document.createElement('td')

    var td1 = tr.appendChild(document.createElement('td'))
    var td2 = tr.appendChild(document.createElement('td'))
    var td3 = tr.appendChild(document.createElement('td'))
    var td4 = tr.appendChild(document.createElement('td'))

    var nombre = document.createTextNode(nombre.value)
    var apellido = document.createTextNode(apellido.value)
    var curso = document.createTextNode(curso.value)
    var punto = document.createTextNode('0')


    td1.appendChild(nombre)
    td2.appendChild(apellido)
    td3.appendChild(curso)
    td4.appendChild(punto)
    // td2.innerHTML=apellido
    // td3.innerHTML=curso

    table.appendChild(tr)

    // document.getElementById('table').appendChild(tr)
}