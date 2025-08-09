let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
// legacy flags removed (handled by Player / controller)
let marco = new Player('marco');
function createEnemies() {
  const s1 = new Soldier(); s1.init();
  const s2 = new Soldier(); s2.init(); s2.stop = 300; s2.x = canvas.width + 200;
  const s3 = new Soldier(); s3.init(); s3.stop = 370; s3.x = canvas.width + 250;
  const r1 = new RebelSoldier(); r1.init();
  const r2 = new RebelSoldier(); r2.init(); r2.stop = 500;
  return [s1,s2,s3,r1,r2];
}
const BULLET_POOL_SIZE = 40; // shared for both players
const baseSpawnInterval = 2; // seconds initial
const minSpawnInterval = 0.6; // fastest spawn

class GameState {
  constructor() { this.hardReset(); }
  hardReset() {
    this.arrayShootsMarco = [];
  // single player mode: only marco shots
    this.bulletPool = [];
    this.arraySoldiers = [];
    this.explosions = [];
    this.enemySpawnTimer = 0;
    this.score = 0;
    this.timeLeft = 60; // seconds
    this.frames = 0;
    this.lastTime = 0;
    this.running = false;
  }
  initPools() {
    this.bulletPool = [];
    for (let i=0;i<BULLET_POOL_SIZE;i++) { const b = new Shoot(); b.init(-100,-100); b.active = false; this.bulletPool.push(b); }
  }
  softReset() {
    this.arraySoldiers = createEnemies();
    this.explosions = [];
    this.enemySpawnTimer = 0;
    this.arrayShootsMarco = [];
  // single player mode
    this.score = 0;
    this.timeLeft = 60;
    this.frames = 0;
    this.lastTime = 0;
    this.initPools();
  }
}

let state = new GameState();
let board = new Background();
let playerController;
let audioBgm = null;
// compatibility globals for existing code paths (Player.fire)
let bulletPool = state.bulletPool;


window.onload = function () {
  function initGame() {
    // Background music with modern Audio API
    audioBgm = new Audio('./assets/escape.mp3');
    audioBgm.loop = true;
    audioBgm.volume = 1.0;
    audioBgm.play().catch(()=>{});
    state.softReset();
    state.arraySoldiers = createEnemies();
    bulletPool = state.bulletPool; // sync reference
    board.init();
  marco.init();
    // Initialize controller after players ready
  playerController = new PlayerController(marco);
  }

  function update(timestamp) {
  if (!state.running) return;
  if (!state.lastTime) state.lastTime = timestamp;
  const delta = (timestamp - state.lastTime) / 1000; // seconds
  state.lastTime = timestamp;
  state.frames++;
    context.clearRect(0, 0, canvas.width, canvas.height);
  playerController.update();
  updateShoots(delta);
  updateEnemies(delta, state.frames);
  updateExplosions(delta);
  checkCollition();
  board.draw();
  marco.update(delta, state.frames);
  marco.draw();
  drawShoots();
  drawEnemies();
  drawExplosions();
  spawnEnemies(delta);
  state.timeLeft -= delta;
  board.drawHUD(state.score, state.timeLeft, computeDifficultyFactor());
  if (state.timeLeft <= 0) {
      gameOver();
    } else {
      requestAnimationFrame(update);
    }
  }

  function startGame() {
    if (state.running) return;
    initGame();
    state.running = true;
    requestAnimationFrame(update);
  }

  function updateEnemies(delta, frame) { state.arraySoldiers.forEach(e => e.update && e.update(delta, frame)); }
  function drawEnemies() { state.arraySoldiers.forEach(e => e.draw && e.draw()); }

  function updateExplosions(delta) {
    for (let i = state.explosions.length -1; i>=0; i--) {
      const ex = state.explosions[i];
      ex.update(delta);
      if (!ex.isAlive()) state.explosions.splice(i,1);
    }
  }
  function drawExplosions() { state.explosions.forEach(e => e.draw()); }

  function updateShoots(delta) {
  state.bulletPool.forEach(b => b.update(delta));
  state.arrayShootsMarco = state.bulletPool.filter(b => b.active && b.owner === 'marco');
  // no second player filtering required
  }

  function drawShoots() {
  state.bulletPool.forEach(b => b.draw());
  }

  function computeDifficultyFactor() {
  const timeProgress = 1 - (state.timeLeft / 60); // 0 -> 1
  const scoreFactor = Math.min(1, state.score / 2000); // reaches 1 at 2000 pts
    return Math.min(1, timeProgress * 0.6 + scoreFactor * 0.8); // weighted mix
  }

  function currentSpawnInterval() {
    const f = computeDifficultyFactor();
    return Math.max(minSpawnInterval, baseSpawnInterval - f * (baseSpawnInterval - minSpawnInterval));
  }

  function spawnEnemies(delta) {
    state.enemySpawnTimer += delta;
    const interval = currentSpawnInterval();
    if (state.enemySpawnTimer >= interval) {
      state.enemySpawnTimer -= interval; // preserve overflow time
      const roll = Math.random();
      let enemy;
      if (roll < 0.5) {
        enemy = new Soldier(); enemy.init(); enemy.stop = 150 + Math.random()*200;
      } else {
        enemy = new RebelSoldier(); enemy.init(); enemy.stop = 400 + Math.random()*150;
      }
      // speed scales with difficulty (base 5 -> up to 8)
      const f = computeDifficultyFactor();
      enemy.speed = 5 + f * 3;
      state.arraySoldiers.push(enemy);
    }
  }

  function checkCollition (){
    // Generic collision handler for both players' shots
  const process = (shotsArray) => {
      for (let i = shotsArray.length - 1; i >= 0; i--) {
        const shot = shotsArray[i];
        let hitIndex = -1;
        for (let j = 0; j < state.arraySoldiers.length; j++) {
          const enemy = state.arraySoldiers[j];
            if (enemy.isTouching(shot)) {
              hitIndex = j;
              break;
            }
        }
        if (hitIndex > -1) {
          const enemy = state.arraySoldiers[hitIndex];
          // spawn explosion at enemy position baseline
          const ex = new Explosion();
          ex.init(enemy.x, canvas.height - 140);
          state.explosions.push(ex);
          state.arraySoldiers.splice(hitIndex, 1);
          // deactivate bullet so it doesn't continue next frame
          if (shot.active !== undefined) shot.active = false;
          shotsArray.splice(i, 1);
          state.score += 100; // award points per enemy
        } else if (shot.x > canvas.width + 40) {
          shotsArray.splice(i,1); // cleanup off-screen
        }
      }
    };
  process(state.arrayShootsMarco);
  }

  function gameOver() {
  state.running = false;
    context.fillStyle = 'rgba(0,0,0,0.5)';
    context.fillRect(0,0,canvas.width,canvas.height);
    context.fillStyle = '#fff';
    context.font = '32px Arial';
    context.fillText('GAME OVER', canvas.width/2 - 110, canvas.height/2 - 10);
    context.font = '20px Arial';
  context.fillText(`Score: ${state.score}`, canvas.width/2 - 55, canvas.height/2 + 25);
    context.font = '14px Arial';
    context.fillText('Press R to restart', canvas.width/2 - 70, canvas.height/2 + 55);
  }

  addEventListener('keydown', (e) => {
    if (e.code === 'KeyP') {
      if (state.running) {
        state.running = false;
      } else if (state.timeLeft > 0) {
        state.running = true; requestAnimationFrame(update);
      }
    } else if (e.code === 'KeyR' && !state.running) {
      state = new GameState();
      state.softReset();
      bulletPool = state.bulletPool; // sync
  marco = new Player('marco'); marco.init();
  playerController = new PlayerController(marco);
      state.running = true; requestAnimationFrame(update);
    }
  });

  startGame();
};
