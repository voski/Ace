(function () {
	if (typeof Ace === "undefined") {
		Ace = {};
	}

	var GameView = Ace.GameView = function (game, gameCtx, paintCtx) {
		this.game = game;
		this.gameCtx = gameCtx;
		this.paintCtx = paintCtx;
	};

	GameView.prototype.start = function () {
		this._running = true;
		var gameView = this;
		function animate() {
			gameView.animationRequest = requestAnimationFrame(animate)

			for (var i = 0; i < Ace.Plane.steps; i++) {
				gameView.game.step();
				gameView.game.draw(gameView.gameCtx, gameView.paintCtx);
			}
		}
		animate();
	};

	GameView.prototype.stop = function () {
		this._running = false;
		cancelAnimationFrame(this.animationRequest);
	}

	GameView.prototype.toggle = function () {
		if (this._running) {
			this.stop();
		} else {
			this.start();
		}
	};

	GameView.prototype.clearCanvas = function () {
		this.paintCtx.clearRect(0,0, Ace.Game.DIM_X, Ace.Game.DIM_Y)
	};
})();
