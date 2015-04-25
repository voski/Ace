(function() {
	if (typeof Ace === 'undefined') {
		Ace = {};
	}

	var Plane = Ace.Plane = function (options) {
		options.color = Plane.COLOR;
		options.radius = Plane.RADIUS;
		options.vel = this.velFn;
		// options.pos = [Ace.Game.DIM_X / 2, Ace.Game.DIM_Y / 2];
		Ace.MovingObject.call(this, options)
		this._path = [];
		this.rod = [options.pos[0] + Plane.ROD_LENGTH, options.pos[1]]
		this.rod_history = [];
		this.rodAlive = false;
	}

	Ace.Util.inherits(Plane, Ace.MovingObject);

	Plane.COLORS = [
		"#A6121F",
		"#FF1D23",
		"#F2D0A7",
		"#F29727",
		"#EC97FF",
		"#D93E30",
		"#32CC6B",
		"#80FF57",
		"#8532CC",
		"#0578A6",
		"#450003",
		"#5C0002",
		"#94090D",
		"#729980",
		"#D40D12",
		"#6495ED",
		"#FFDEAD",
	];

	Plane.RADIUS = 25;
	Plane.period = 360;
	Plane.amplitude = 1.5;
	Plane.ROD_LENGTH = 50;
	Plane.ROD_PERIOD = Plane.period * 4;
	Plane.ROD_LENGTH_PERIOD = Plane.period * 2;

	Plane.prototype.velFn = function () {
		if (this._aliveFor === false) {
			this._aliveFor = 0;
			this._vel = [0,0];
			this._deg = 0;
		}
			this._deg += .5;
			if (this._deg > Plane.period - 1) {
				this._deg = 0;
			}

		var deg = this._deg * (Math.PI / 180);
		// console.log(this._deg);
		this._vel[0] = Math.pow(Math.sin(deg), 1) * Plane.amplitude;
		this._vel[1] = Math.pow(Math.cos(deg), 1) * Plane.amplitude;
		if (this._aliveFor % Plane.period / 4 === 0) {
		}
		return this._vel;
	}
	Plane.prototype.move = function () {
		var vel = this.vel();
		var pos = [this.pos[0], this.pos[1]]
		if (this._path.length < 180) {
			this._path.push(pos);
		} else {
			this._path.shift();
			this._path.push(pos);
		}
		this.pos[0] += vel[0];
		this.pos[1]	+= vel[1];
		this.updateRod();
	}

	Plane.prototype.updateRod = function() {
		if (this.rodAlive === false) {
			this.rodAlive = 0;
		} else if (this.rodAlive > 0 && this.rodAlive % Plane.ROD_PERIOD === 0) {
			this.rodAlive = 0;
		} else {
			this.rodAlive += 1;
		}
		var theta = 2 * Math.PI * (this.rodAlive / Plane.ROD_PERIOD);
		var theta2 = 2 * Math.PI * (this.rodAlive / Plane.ROD_LENGTH_PERIOD);
		var length = Plane.ROD_LENGTH  * Math.cos(theta2) ;
		if (length < 0) {
			console.log(length)
		}
		var rel_x = length * Math.cos(theta);
		var rel_y = length * Math.sin(theta);
		this.rod = [this.pos[0]+ rel_x, this.pos[1] + rel_y];
		// if (this.rod_history.length < 1000) {
			this.rod_history.push([this.rod[0], this.rod[1]]);
		// }
	}

	Plane.prototype.draw = function (ctx) {
    ctx.beginPath();
    ctx.arc( this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false );
		ctx.fillStyle = '#aaa';
    ctx.fill();
		this.drawLine(ctx, this.rod, this.pos)
		this.drawPath(ctx, this.rod_history, 31);

  };
	Plane.prototype.drawPath = function (ctx, history, repeat) {

		for (var i = 0; i < history.length; i++) {
			if (i % repeat === 0) {
				ctx.fillStyle = Plane.COLORS[i % Plane.COLORS.length]
			}
			var pos = history[i]

			ctx.fillRect(pos[0],pos[1],3,3)
		}
	};

	Plane.prototype.color = function (color) {

	}

	Plane.prototype.drawLine = function (ctx, pos1, pos2) {
		ctx.beginPath();
		ctx.moveTo(pos1[0], pos1[1]);
		ctx.lineTo(pos2[0], pos2[1]);
		ctx.strokeStyle = '#FFF';
		ctx.stroke();
	}
})();
