(function () {
	if (typeof Ace === "undefined") {
		Ace = {};
	}

	var GameView = Ace.GameView = function (game, ctx) {
		this.game = game;
		this.ctx = ctx;	
	};

	GameView.prototype.start = function () {
		var gameView = this;
    this.timerId = setInterval(
      function () {
        gameView.game.step();
        gameView.game.draw(gameView.ctx);
      }, 1000 / Ace.Game.FPS
    );
	};

})();