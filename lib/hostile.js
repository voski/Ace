(function () {
	if (typeof Ace === "undefined") {
		Ace = {};
	};

	var Hostile = Ace.Hostile = function (options) {
		options.color = Hostile.COLOR;
		options.radius = Hostile.RADIUS;
		options.vel = options.vel || Ace.Util.randomVec(Hostile.SPEED, 'down');
		options.pos = options.pos || options.game.randomPosition({y: 300});

		Ace.MovingObject.call(this, options);
	}

	Ace.Util.inherits(Hostile, Ace.MovingObject);

	Hostile.prototype.draw = function (ctx) {
		var ship = new Image();
	  ship.src = './img/hostile.PNG';
  	var scale = 0.4
  	ctx.drawImage(ship, this.pos[0], this.pos[1], ship.width * scale, ship.height * scale)
	};

	Hostile.COLOR = "#FF2A1E";
	Hostile.RADIUS = 25;
	Hostile.SPEED = 1;


})();