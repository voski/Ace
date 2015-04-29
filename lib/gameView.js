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
    this.timerId = setInterval(
      function () {
				for (var i = 0; i < 500; i++) {
	        gameView.game.step();
	        gameView.game.draw(gameView.gameCtx, gameView.paintCtx);
				}
      }, 1000 / Ace.Game.FPS
    );
	};

})();
