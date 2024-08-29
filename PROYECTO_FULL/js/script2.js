let wheel =document.querySelector("#wheel");
let button =document.querySelector("#spin");
button.addEventListener("click", spinWheel);

function spinWheel(evt){
    let spin = Math.round(Math.random()* 2220);
    wheel.style.transition = " ease 1s";
    wheel.style.transform = "rotate("+ spin +"deg)";
}

/*pantalla emergente*/


const showPopup = document.querySelector('.spin');
const showContainer = document.querySelector('.popup-container');
const closeBtn = document.querySelector('.close-btn');

showPopup.onclick = () => {
    setTimeout(() => {
        showContainer.classList.add('active');
    },2000);
};

closeBtn.onclick = () => {
    console.log('Botón de cerrar clicado');
    showContainer.classList.remove('active');
};


