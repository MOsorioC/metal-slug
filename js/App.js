let canvas = document.querySelector('#canvas')
let context = canvas.getContext('2d')
let player = new Player();
let player2 = new Player();

let isPressed = false;
let isShooting = false;

window.onload = function () {

  player.init();
  var inicio = new Init();

  addEventListener('keydown', (e) => {
    if(e.keyCode === 39) {
      if (!isPressed) {
          isPressed = true;
          isShooting = false;
          player.stop();
          player.run();
      }
    } else if(e.keyCode === 32) {
      if (!isShooting) {
        isShooting = true;
        player.stop();
        player.shoot();
      } else {
        player.stop();
        player.shooting();
      }
    }
  });

  addEventListener('keyup',(e) => {
    if(e.keyCode === 39) {
      isPressed = false;
      player.stop();
      player.stand();
    }
  });
};
