let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
let isPressed = false;
let isShooting = false;
let isJumping = false;
let isPressedTarma = false;
let marco = new Marco();
let tarma = new Marco();
let soldier = new Soldier();
soldier.init();
let soldier2 = new Soldier();
soldier2.init();
soldier2.stop = 300;
soldier2.x = canvas.width + 200;
let soldier3 = new Soldier();
soldier3.init();
soldier3.stop = 370;
soldier3.x = canvas.width + 250;
let rebelSoldier = new RebelSoldier();
rebelSoldier.init();
let rebelSoldier2 = new RebelSoldier();
rebelSoldier2.init();
rebelSoldier2.stop = 500;
let arrayShootsMarco = [];
let arrayShootsTarma = [];
let arraySoldiers = [];
let board = new SpaceBackground();
let intervalo
let frames = 0;


window.onload = function () {
  function initGame() {
    var foo = new Sound("./assets/escape.mp3",100,true);
    foo.start();
    arraySoldiers.push(soldier);
    arraySoldiers.push(soldier2);
    arraySoldiers.push(soldier3);
    arraySoldiers.push(rebelSoldier);
    arraySoldiers.push(rebelSoldier2);
    board.init();
    marco.init();
    tarma.init();
    tarma.x = 80;
  }

  function update() {
    frames++;
    context.clearRect(0, 0, canvas.width, canvas.height);
    checkCollition();
    board.draw();

    marco.draw(frames);
    drawShoots();
    tarma.draw(frames);
    /*soldier.draw(frames);
    soldier2.draw(frames);
    soldier3.draw(frames);*/
    initSoldiers(frames);
    rebelSoldier.draw(frames);
  }

  function stop(){
    clearInterval(intervalo)
    intervalo = 0
  }

  function startGame() {
    initGame();

    if(intervalo > 0) return

    intervalo = setInterval(function() {
      update()
    },1000/16)
  }

  function initSoldiers(frame) {
    arraySoldiers.forEach((so) => {
      so.draw(frame);
    });
  }

  function drawShoots(frames) {
    arrayShootsMarco.forEach((s) => {
      s.draw();
    });

    arrayShootsTarma.forEach((s) => {
      s.draw();
    });
  }

  function checkCollition (){

    for(var i = 0; i < arrayShootsMarco.length; i++) {
      let touch = false;

      for(let j = 0; j < arraySoldiers.length; j++) {
        var soldado = arraySoldiers[j];
        console.log(arraySoldiers);
        if (soldado.isTouching(arrayShootsMarco[i])) {
          touch = true;
          arraySoldiers.splice(j,1);
          break;
        }
      }
      if (touch){
        arrayShootsMarco.splice(i,1);
      }
    }


    for(var i = 0; i < arrayShootsTarma.length; i++) {
      let touch = false;

      for(let j = 0; j < arraySoldiers.length; j++) {
        var soldado = arraySoldiers[j];
        console.log(soldado);
        if (soldado.isTouching(arrayShootsTarma[i])) {
          touch = true;
          arraySoldiers.splice(j,1);
          break;
        }
      }
      if (touch){
        arrayShootsTarma.splice(i,1);
      }
    }
  }

  startGame();

  addEventListener('keydown', (e) => {

    if(e.keyCode === 39) {
      if (!isPressed) {
        isPressed = true;
        marco.status = "run";
        marco.imgY = 280;
        marco.imagePosition = -22;
      }
    } else if(e.keyCode === 32) {
      var shot = new Shoot();
      shot.init(marco.x + 65, marco.y);
      arrayShootsMarco.push(shot);

      marco.status = "shooting";
      marco.imgY = 155;
      marco.imagePosition = 400;
    } else if(e.keyCode === 40) {
    }else if(e.keyCode === 38) {
      marco.status = "jump";
      marco.imgY = 225;
      marco.imagePosition = 8;
    } else if(e.keyCode === 68){
      if (!isPressedTarma) {
        isPressedTarma = true;
        tarma.status = "run";
        tarma.imgY = 280;
        tarma.imagePosition = -22;
      }
    } else if(e.keyCode === 70){
      var shot = new Shoot();
      shot.init(tarma.x + 65, tarma.y);
      arrayShootsTarma.push(shot);
      tarma.status = "shooting";
      tarma.imgY = 155;
      tarma.imagePosition = 400;
    } else if(e.keyCode === 87){
      tarma.status = "jump";
      tarma.imgY = 225;
      tarma.imagePosition = 8;
    }


  });

  addEventListener('keyup',(e) => {
    if(e.keyCode === 39) {
      isPressed = false;
      marco.status = "stand";
      marco.imgY = 0;
      marco.imagePosition = 5;
    } else if(e.keyCode === 68) {
      isPressedTarma = false;
      tarma.status = "stand";
      tarma.imgY = 0;
      tarma.imagePosition = 5;
    }
  });
};


function Sound(source,volume,loop)
{
    this.source=source;
    this.volume=volume;
    this.loop=loop;
    var son;
    this.son=son;
    this.finish=false;
    this.stop=function()
    {
        document.body.removeChild(this.son);
    }
    this.start=function()
    {
        if(this.finish)return false;
        this.son=document.createElement("embed");
        this.son.setAttribute("src",this.source);
        this.son.setAttribute("hidden","true");
        this.son.setAttribute("volume",this.volume);
        this.son.setAttribute("autostart","true");
        this.son.setAttribute("loop",this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish=true;
    }
    this.init=function(volume,loop)
    {
        this.finish=false;
        this.volume=volume;
        this.loop=loop;
    }
}
