let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
let marco = new Marco();
let tarma = new Marco();

let isPressed = false;
let isShooting = false;

window.onload = function () {

  marco.init();
  var inicio = new Init();

  addEventListener('keydown', (e) => {
    if(e.keyCode === 39) {
      if (!isPressed) {
          isPressed = true;
          isShooting = false;
          marco.stop();
          marco.run();
      }
    } else if(e.keyCode === 32) {
      if (!isShooting) {
        isShooting = true;
        marco.stop();
        marco.shoot();
      } else {
        marco.stop();
        marco.shooting();
      }
    }
  });

  addEventListener('keyup',(e) => {
    if(e.keyCode === 39) {
      isPressed = false;
      marco.stop();
      marco.stand();
    }
  });
};
