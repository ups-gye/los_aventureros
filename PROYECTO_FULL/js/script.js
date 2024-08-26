const ruleta = document.getElementById("ruleta")

const uno = {
    nombre: "Uno",
    probabilidad: 20
}

const dos = {
    nombre: "Dos",
    probabilidad: 50
}

const tres = {
    nombre: "Tres",
    probabilidad: 30
}

let conceptos = [uno]

const colores = ["#EEAD9F", "#CCA269", "#D9DA46", "#79B326", "#3AD192", "#3AD0D1", "#3A8FD1", "#3A54D1", "#7553D0", "#9A53D0", "#D053C0"]

function ajustarRuleta(){
    const opcionesContainer = document.createElement("div")
    opcionesContainer.id = "opcionesContainer"
    ruleta.appendChild(opcionesContainer)
    conceptos.forEach((concepto, i) =>{
        // Creamos los triangulos de colores
        const opcionElement = document.createElement("div")
        opcionElement.classList.add("opcion")
        opcionesContainer.appendChild(opcionElement)
        opcionElement.style = `background-color: ${colores[i]}
        ${getPosicionParaProbabilidad(concepto.probabilidad)}`
    })
}

function getPosicionParaProbabilidad(probabilidad){
	if(probabilidad === 100){
		return ''
	}
	if(probabilidad >= 87.5){
		// const x5 = Math.tan(probabilidadARadianes(probabilidad))*50+50;
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0 0, ${x5}% 0, 50% 50%)`
	}
	if(probabilidad >= 75){
		// const y5 = 100 - (Math.tan(probabilidadARadianes(probabilidad-75))*50+50);
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
	}
	if(probabilidad >= 62.5){
		// const y5 = 100 - (0.5 - (0.5/ Math.tan(probabilidadARadianes(probabilidad))))*100;
		return `clip-path: polygon(50% 0%, 100% 0, 100% 100%, 0 100%, 0% ${y5}%, 50% 50%)`
	}
	if(probabilidad >= 50){
		// const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad))*50+50);
		return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
	}
	if(probabilidad >= 37.5){
		// const x4 = 100 - (Math.tan(probabilidadARadianes(probabilidad))*50+50);
		return `clip-path: polygon(50% 0, 100% 0, 100% 100%, ${x4}% 100%, 50% 50%)`
	}
	if(probabilidad >= 25){
		// const y3 = Math.tan(probabilidadARadianes(probabilidad-25))*50+50;
		return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
	}
	if(probabilidad >= 12.5){
		// const y3 = (0.5 - (0.5/ Math.tan(probabilidadARadianes(probabilidad))))*100;
		return `clip-path: polygon(50% 0, 100% 0, 100% ${y3}%, 50% 50%)`
	}
	if(probabilidad >= 0){
		// const x2 = Math.tan(probabilidadARadianes(probabilidad))*50 + 50;
		return `clip-path: polygon(50% 0, ${x2}% 0, 50% 50%)`
	}
}



ajustarRuleta();