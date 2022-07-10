let El_Sol;
let La_Luna;

let mouseIsDown = false;
let paintbrush = null;
let imgElement = document.createElement('img');
let cards = ['La_Luna.jpg', 'El_Sol.jpg', 'La_Torre.jpg', 'El_Carro.jpg',
  'El_Colgado.jpg', 'El_Diablo.jpg', 'La_Estrella.jpg', 'La_Muerte.jpg', 'La_Sacerdotisa.jpg', 'Los_Enamorados.jpg'];

const handleMouseDown = () => {
  mouseIsDown = true;
  let randomNumber = Math.floor(Math.random() * 10);
  imgElement.src = "mayores/" + cards[randomNumber];
  paintbrush = imgElement;
}

const handleMouseUp = () => {
  mouseIsDown = false;
}

const handleMouseMove = (event) => {
  if(paintbrush != null) {
  const scrollAmount = document.scrollingElement.scrollTop;
  const paintbrushHeight = paintbrush.naturalHeight;
  const paintLimit = window.innerHeight - paintbrushHeight;
  const left = event.clientX;
  const top = Math.min(paintLimit, event.clientY + scrollAmount);
  context.drawImage(paintbrush, left, top);
  }
}

const handleTouchMove = (event) => {
  if (paintbrush != null) {
  const scrollAmount = document.scrollingElement.scrollTop;
  const paintbrushHeight = paintbrush.naturalHeight;
  const paintLimit = window.innerHeight - paintbrushHeight;
  const left = event.touches[0].clientX;
  const top = Math.min(paintLimit, event.touches[0].clientY + scrollAmount);
  
    context.drawImage(paintbrush, left, top);
  }
}


const canvas = document.querySelector('#drawingCanvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

El_Sol = document.createElement('img');
El_Sol.src = 'mayores/El_Sol.jpg';
La_Luna = document.createElement('img');
La_Luna.src = 'mayores/La_Luna.jpg';


canvas.addEventListener('mousemove', handleMouseMove);
window.addEventListener('mousedown', handleMouseDown);
window.addEventListener('mouseup', handleMouseUp);

canvas.addEventListener('touchmove', handleTouchMove);
window.addEventListener('touchstart', handleMouseDown);
window.addEventListener('touchend', handleMouseUp);
