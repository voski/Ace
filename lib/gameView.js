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
		var gameView = this;
		function animate() {
			requestAnimationFrame(animate)

			for (var i = 0; i < Ace.Plane.steps; i++) {
				gameView.game.step();
				gameView.game.draw(gameView.gameCtx, gameView.paintCtx);
			}
		}
		animate();
	};
})();
