(function() {
	if (typeof Ace === 'undefined') {
		Ace = {};
	}

	var Plane = Ace.Plane = function (options) {
		options.color = Plane.COLORS[0];
		options.radius = Plane.RADIUS;
		options.vel = this.velFn;
		// options.pos = [Ace.Game.DIM_X / 2, Ace.Game.DIM_Y / 2];
		Ace.MovingObject.call(this, options)
		// this._path = [];
		this.rod = [options.pos[0] + Plane.ROD_LENGTH, options.pos[1]]
		// this.rod_history = [];
		this.hyperAlive = false;
		this._colorRepeat = 0;
	}

	Ace.Util.inherits(Plane, Ace.MovingObject);

	// Plane.COLOR = '#EEE'
	Plane.RADIUS = 10;
	Plane.period = 360 * 6;
	Plane.amplitude = .75;
	Plane.ROD_LENGTH = 300;
	Plane.HYPER_PERIOD = Plane.period * .75;
	Plane.ROD_LENGTH_PERIOD = Plane.period * .75;
	Plane.SPIRAL_PERIOD = Plane.period * .4;
	Plane.SPIRAL_AMP = 3;

	Plane.prototype.velFn = function () {
		if (this._aliveFor === false) {
			this._aliveFor = 0;
			this.spiralAliveFor = 0;
			this._vel = [0,0];
		} else if (this._aliveFor > 0 && this._aliveFor % Plane.period  === 0) {
			// debugger
			this.color = this.randomcolor();
			this._aliveFor = 0;
			this.pos = [Ace.Game.DIM_X / 3, Ace.Game.DIM_Y / 2]
		} else {
			this._aliveFor += 1;
		}

		if (this.spiralAliveFor > 0 && this.spiralAliveFor % Plane.SPIRAL_PERIOD === 0) {
			this.spiralAliveFor = 0;
		} else {
			this.spiralAliveFor += 1;
		}
		var rad = 2 * Math.PI * (this._aliveFor / Plane.period);
		var spiralTheta = 2 * Math.PI * (this.spiralAliveFor / Plane.SPIRAL_PERIOD)
		var oscAmp = Plane.SPIRAL_AMP * Math.cos(spiralTheta)
		oscAmp = Math.min(oscAmp, 1)

		// this._vel[0] = Math.sin(rad) * Plane.amplitude * (this._aliveFor / (Plane.period * 2 ));
		// this._vel[1] = Math.cos(rad) * Plane.amplitude * (this._aliveFor / (Plane.period * 2 ));
		this._vel[0] = Math.pow(Math.sin(rad), 1) * oscAmp;
		this._vel[1] = Math.pow(Math.cos(rad), 1) * oscAmp;
		return this._vel;
	}
	Plane.prototype.move = function () {
		var vel = this.vel();
		var pos = [this.pos[0], this.pos[1]]
		// if (this._path.length < 500) {
			// this._path.push(pos);
		// } else {
			// this._path.shift();
			// this._path.push(pos);
		// }
		this.pos[0] += vel[0];
		this.pos[1]	+= vel[1];
		this.updateRod();
	}

	Plane.prototype.updateRod = function() {
		if (this.hyperAlive === false) {
			this.hyperAlive = 0;
			this.rodAlive = 0;
		} else if (this.hyperAlive > 0 && (this.hyperAlive % Plane.HYPER_PERIOD === 0)) {
			this.hyperAlive = 0;
			// debugger
		} else {
			this.hyperAlive += 1;
		}

		if (this.rodAlive > 0 && (this.rodAlive % Plane.ROD_LENGTH_PERIOD === 0)) {
			this.rodAlive = 0;
			// debugger
		}	else {
			this.rodAlive += 1;
		}
		var theta = 2 * Math.PI * (this.hyperAlive / Plane.HYPER_PERIOD);
		var theta2 = 2 * Math.PI * (this.hyperAlive / Plane.ROD_LENGTH_PERIOD);
		var length = Plane.ROD_LENGTH  * Math.pow(Math.cos(theta2),3);
		// var length = Plane.ROD_LENGTH  * (Math.pow(Math.sin(theta2),5) * Math.pow(Math.sin(theta2),3));
//
		var rel_x = length * Math.cos(theta);
		var rel_y = length * Math.sin(theta);
		this.rod = [this.pos[0]+ rel_x, this.pos[1] + rel_y];
		// if (this.rod_history.length < 1000) {
			// this.rod_history.push([this.rod[0], this.rod[1]]);
		// }
	}

	Plane.prototype.draw = function (gameCtx, paintCtx) {
    gameCtx.beginPath();
    gameCtx.arc( this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false );
		gameCtx.fillStyle = this.color;
    gameCtx.fill();
		this.drawLine(gameCtx, this.rod, this.pos)
		// this.drawPath(gameCtx, paintCtx, this.rod_history, 100);
		// paintCtx.fillRect(this.rod[0] ,this.rod[1] ,5,5)

		this.drawPath(gameCtx, paintCtx, this._path, 100);

  };
	Plane.prototype.drawPath = function (gameCtx, paintCtx, history, repeat) {
			paintCtx.fillStyle = this.color;
			gameCtx.fillStyle = this.color;
			// debugger
				// gameCtx.fillStyle = this.color = Plane.COLORS[0]
				// gameCtx.fillStyle = this.color = Plane.COLORS[Math.floor(Math.random() * Plane.COLORS.length)]
			// var pos = history[i]


			paintCtx.fillRect( Math.round(this.rod[0] * 10) / 10  , Math.round(this.rod[1] * 10) / 10, 5, 5)

	};

	Plane.prototype.randomcolor = function (repeat) {
		// if (this._colorRepeat === 0) {
		// 	this._colorRepeat += 1;
		// 	return Plane.COLORS[0]
		// } else if (this._colorRepeat % repeat === 0){
		// 	this._colorRepeat = 1;
		// 	return Plane.COLORS[Math.floor(Math.random() * Plane.COLORS.length)]
		// }
		// 	this._colorRepeat += 1;
		// return Plane.COLORS[3]
		return Plane.COLORS[Math.floor(Math.random() * Plane.COLORS.length)];
	}

	Plane.prototype.drawLine = function (gameCtx, pos1, pos2) {
		gameCtx.beginPath();
		gameCtx.moveTo(pos1[0], pos1[1]);
		gameCtx.lineTo(pos2[0], pos2[1]);
		gameCtx.strokeStyle = this.color;
		gameCtx.stroke();
	}

	Plane.COLORS = [
		"#FF00FF",
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

})();
