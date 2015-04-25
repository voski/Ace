(function () {
	if (typeof Ace === "undefined") {
		Ace = {};
	};

	var Hostile = Ace.Hostile = function (options) {
		options.width = Hostile.WIDTH;
		options.height = Hostile.HEIGHT;
		options.vel = options.vel || Ace.Util.randomVec(Hostile.SPEED, 'down');
		options.pos = options.pos || options.game.randomPosition({y: 300, x: Hostile.WIDTH});
		Ace.MovingObject.call(this, options);
	}

	Ace.Util.inherits(Hostile, Ace.MovingObject);

	Hostile.prototype.draw = function (ctx) {
  	ctx.drawImage(
			Hostile.IMG,
			this.pos[0],
			this.pos[1],
			Hostile.WIDTH,
			Hostile.HEIGHT
		)
		
	};


	Hostile.SCALE = 0.4;
	Hostile.SPEED = 3;
  Hostile.IMG = new Image();
	Hostile.IMG.src = './img/hostile.PNG'
	Hostile.HEIGHT = Hostile.IMG.height = 125  * Hostile.SCALE;
	Hostile.WIDTH = Hostile.IMG.width = 90  * Hostile.SCALE;

})();
