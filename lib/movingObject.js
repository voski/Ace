(function () {
	if (typeof Ace === "undefined") {
		Ace = {};
	};

	var MovingObject = Ace.MovingObject = function (options) {
		this.pos = options.pos;
		this.vel = options.vel;
		this.radius = options.radius;
		this.color = options.color;
		this.game = options.game;
		this.width = options.width;
		this.height = options.height;
		this._aliveFor = false;
	};

	MovingObject.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc( this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false );
		ctx.fillStyle = this.color;
    ctx.fill();
  };

	MovingObject.prototype.move = function () {
		if (this.game.wrap(this.pos, this.width)) {
			this.vel[0] *= -1
		};
		this.pos[0] += this.vel[0];
		this.pos[1]	+= this.vel[1];
	};


})();
