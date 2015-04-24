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

	Hostile.COLOR = "#FF2A1E";
	Hostile.RADIUS = 25;
	Hostile.SPEED = 1;

	Ace.Util.inherits(Hostile, Ace.MovingObject);

})();