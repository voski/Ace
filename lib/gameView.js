(function () {
	if (typeof Ace === "undefined") {
		Ace = {};
	}

	var GameView = Ace.GameView = function (game, gameCtx, paintCtx) {
		this.game = game;
		this.gameCtx = gameCtx;
		this.paintCtx = paintCtx;
	};

	GameView.prototype.start = function (steps) {
		var gameView = this;
		// var animate = this.genAnimate(1000);
		function animate() {
			requestAnimationFrame(animate)

			for (var i = 0; i < steps; i++) {
				gameView.game.step();
				gameView.game.draw(gameView.gameCtx, gameView.paintCtx);
			}
		}
		animate();
	};

	// GameView.prototype.genAnimate = function (steps) {
	// 	return function animate() {
	// 		var fn = this;
	// 		requestAnimationFrame(fn)
	// 		for (var i = 0; i < steps; i++) {
	// 			gameView.game.step();
	// 			gameView.game.draw(gameView.gameCtx, gameView.paintCtx);
	// 		}
	// 	}
	// };

})();
