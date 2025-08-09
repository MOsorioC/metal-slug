class PlayerController {
	constructor(player1) {
		this.p1 = player1;
		this.keys = new Set();
		this.bindEvents();
	}

	bindEvents() {
		addEventListener('keydown', (e) => {
			const code = e.code;
			this.keys.add(code);
			switch(code) {
				case 'ArrowRight':
					this.p1.startRunRight();
				break;
				case 'ArrowLeft':
					this.p1.startRunLeft();
				break;
				case 'Space':
					e.preventDefault();
					this.p1.fire();
					console.log('[DEBUG] P1 fire triggered');
				break;
				case 'KeyX': // alternate fire
					e.preventDefault();
					this.p1.fire();
					console.log('[DEBUG] P1 fire (X)');
				break;
				case 'ArrowUp':
					e.preventDefault();
					this.p1.startJump();
					console.log('[DEBUG] P1 jump triggered');
				break;
				// second player controls removed in single-player mode
			}
		});

		addEventListener('keyup', (e) => {
			const code = e.code;
			this.keys.delete(code);
			switch(code) {
				case 'ArrowRight':
					// if still holding left, keep moving left; else stop
					if (this.keys.has('ArrowLeft')) this.p1.startRunLeft(); else this.p1.stand();
				break;
				case 'ArrowLeft':
					// if still holding right, keep moving right; else stop
					if (this.keys.has('ArrowRight')) this.p1.startRunRight(); else this.p1.stand();
				break;
				// P2 stand removed
			}
		});
	}

	update() {}
}
