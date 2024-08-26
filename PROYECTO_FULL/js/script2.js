let wheel =document.querySelector("#wheel");
let button =document.querySelector("#spin");
button.addEventListener("click", spinWheel);

function spinWheel(evt){
    let spin = Math.round(Math.random()* 2220);
    wheel.style.transition = " ease 1s";
    wheel.style.transform = "rotate("+ spin +"deg)";
}