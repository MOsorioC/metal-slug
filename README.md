# Metal Slug (Canvas)

Arcade-style Metal Slug clone built with HTML5 Canvas and vanilla JavaScript. It features a requestAnimationFrame game loop, AABB collisions, animated enemies, bullet pooling, explosions, a HUD (score/time), and dynamic difficulty.

## Quickstart

- Open `index.html` in your browser, or serve the folder with a static server (recommended).
- Controls:
	- Left Arrow: move left
	- Right Arrow: move right
	- Up Arrow: jump
	- Space or X: shoot
	- P: pause/resume
	- R: restart (from GAME OVER)

Tip: Using a local server prevents audio and relative path issues in some browsers.

## Run locally

Options:

1) Open the file directly:
- Double click `index.html` (works in most modern browsers). If you face audio autoplay or CORS issues, use option 2.

## Project structure

- `index.html` – Entry page, links scripts and canvas
- `css/styles.css` – Basic styles
- `assets/` – Images and audio
	- `marco/`, `tarma/`, `soldier/`, etc.
- `js/` – Game source
	- `App.js` – Game entry: main loop, enemy spawn, HUD, collisions, restart
	- `controllers/PlayerController.js` – Keyboard input and player actions
	- `models/` – Game entities
		- `Player.js` – Player (move, jump, shoot, animations, left/right facing and flip)
		- `Shoot.js` – Bullet (pool, direction based on facing)
		- `Soldier.js`, `RebelSoldier.js` – Enemies with animation and AABB collision
		- `Explosion.js` – Visual effect when enemies are destroyed
		- `SpaceBackground.js` – Background and HUD (score/time/difficulty)

### Extensibility

- New enemies: create a model in `models/`, implement `update/draw`, and add it to the spawner in `App.js`.
- Difficulty: tweak `baseSpawnInterval`, `minSpawnInterval`, and `computeDifficultyFactor()` in `App.js`.
- Controls: edit `controllers/PlayerController.js`.
- Player physics/animation: see `models/Player.js` (gravity, jump, frames, muzzle offsets).

## Troubleshooting

- Black screen: open browser console (F12) and check for path/syntax errors.
- No audio: browsers often block autoplay; interact with the page (press a key) or use a local server.
- Misaligned sprites: adjust offsets in `Player.getMuzzleOffset()` and draw sizes in `Player.draw()`.
- Missed collisions: check sizes/positions in `Shoot.js` and `isTouching()` methods in enemy models.

## Credits and license

Educational/practice project. Visual and audio assets are for demo purposes only.