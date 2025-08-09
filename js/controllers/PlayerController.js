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
					this.p1.startRun();
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
					this.p1.stand();
				break;
				// P2 stand removed
			}
		});
	}

	update() {}
}
