let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
let marco = new Marco();
let tarma = new Marco();

let isPressed = false;
let isShooting = false;
let isJumping = false;

window.onload = function () {

  marco.init();
  var inicio = new Init();

  addEventListener('keydown', (e) => {
    if(e.keyCode === 39) {
      if (!isPressed) {
          isPressed = true;
          isShooting = false;
          if (!marco.isJumping) {
              marco.stop();
          }
          marco.run();
      }
    } else if(e.keyCode === 32) {
      if (!isShooting) {
        isShooting = true;
        if (!marco.isJumping) {
          marco.stop();
        }
        marco.shoot();
      } else {
        if (!marco.isJumping) {
            marco.stop();
        }
        marco.shooting();
      }
    } else if(e.keyCode === 40) {
    }else if(e.keyCode === 38) {
      if(!marco.isJumping) {
        marco.stop();
        marco.jump();
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
