(function() {
	if (typeof Ace === 'undefined') {
		Ace = {};
	}

	var Plane = Ace.Plane = function (options) {
		options.color = 'cornflowerblue';
		options.radius = Plane.RADIUS;
		options.vel = this.velFn;
		Ace.MovingObject.call(this, options)
		this.rod = [options.pos[0] + Plane.ROD_LENGTH, options.pos[1]]
		this.hyperAlive = false;
		this._path = []
		this.colorIdx = 0;
	}

	Ace.Util.inherits(Plane, Ace.MovingObject);

	Plane.RADIUS = 10;

	Plane.amplitude = .5;
	Plane.period = 360 * 2;
	Plane.sinStore = [];
	Plane.cosStore = [];

	(function () {
		for (var i = 0; i < Plane.period; i++) {
			var rad = 2 * Math.PI * (i / Plane.period);
			Plane.sinStore.push(Math.sin(rad))
			Plane.cosStore.push(Math.cos(rad))
		}
	})();

	Plane.HYPER_PERIOD = Plane.period * (1) * 5;
	Plane.hyperSinStore = [];
	Plane.hyperCosStore = [];

	(function () {
		for (var i = 0; i < Plane.HYPER_PERIOD; i++) {
			var rad = 2 * Math.PI * (i / Plane.HYPER_PERIOD);
			Plane.hyperSinStore.push(Math.sin(rad));
			Plane.hyperCosStore.push(Math.cos(rad));;
		}
	})();

	Plane.ROD_LENGTH = 400;
	Plane.ROD_LENGTH_PERIOD = Plane.period * (1) * 1.25;
	Plane.rodSinStore = [];
	Plane.rodCosStore = [];
	(function () {
		for (var i = 0; i < Plane.ROD_LENGTH_PERIOD; i++) {
			var rad = 2 * Math.PI * (i / Plane.ROD_LENGTH_PERIOD);
			// Plane.rodSinStore.push(Math.sin(rad));
			Plane.rodCosStore.push(Math.cos(rad));
		}
	})();

	Plane.SPIRAL_PERIOD = Plane.period * (1) * 1;
	Plane.SPIRAL_AMP = 1;

	Plane.colorMult = 25;
	Plane.COLOR_PERIOD = Plane.period * Plane.colorMult;
	Plane.PIXEL_DIM = [1, 1];

	Plane.prototype.velFn = function () {
		if (this._aliveFor === false) {
			this._aliveFor = 0;
			this.spiralAliveFor = 0;
			this._vel = [0,0];
			this.colorAliveFor = 0;
		} else if (this._aliveFor > 0 && this._aliveFor % Plane.period  === 0) {
			this._aliveFor = 0;
			// debugger
			this.pos = this.startPos.slice(0);
		}	else {
			this._aliveFor += 1;
		}

		if (this.colorAliveFor > 0 && this.colorAliveFor % Plane.COLOR_PERIOD === 0) {
			this.colorAliveFor = 0;
			this.color = this.randomcolor()
		} else {
			this.colorAliveFor += 1;
		}

		if (this.spiralAliveFor > 0 && this.spiralAliveFor % Plane.SPIRAL_PERIOD === 0) {
			this.spiralAliveFor = 0;
		} else {
			this.spiralAliveFor += 1;
		}
		// var rad = 2 * Math.PI * (this._aliveFor / Plane.period);
		var spiralTheta = 2 * Math.PI * (this.spiralAliveFor / Plane.SPIRAL_PERIOD)
		// var oscAmp = Plane.SPIRAL_AMP * Math.pow(Math.cos(spiralTheta), 1)
		// oscAmp = Math.min(oscAmp, 1)

		// this._vel[0] = Math.sin(rad) * Plane.amplitude * (this._aliveFor / (Plane.period * 2 ));
		// this._vel[1] = Math.cos(rad) * Plane.amplitude * (this._aliveFor / (Plane.period * 2 ));
		// this._vel[0] =  oscAmp;
		// this._vel[1] =  oscAmp;
		// this._vel[0] = Math.pow(Math.sin(rad), 3) * oscAmp;
		// this._vel[1] = Math.pow(Math.cos(rad), 3) * oscAmp;
		this._vel[0] = Plane.sinStore[this._aliveFor] * Plane.amplitude;
		this._vel[1] = Plane.cosStore[this._aliveFor] * Plane.amplitude;
		return this._vel;
	}
	Plane.prototype.move = function () {
		var vel = this.vel();
		var pos = [this.pos[0], this.pos[1]]
		// if (this._path.length < 3000) {
		// 	this._path.push(pos);
		// } else {
		// 	this._path.shift();
		// 	this._path.push(pos);
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
		// var theta = 2 * Math.PI * (this.hyperAlive / Plane.HYPER_PERIOD);
		// var theta2 = 2 * Math.PI * (this.rodAlive / Plane.ROD_LENGTH_PERIOD);
		var length = Plane.ROD_LENGTH  * Plane.rodCosStore[this.rodAlive];
		// var length = Plane.ROD_LENGTH  * (Math.pow(Math.sin(theta2),5) * Math.pow(Math.sin(theta2),3));
//
var rel_x = length * Plane.hyperCosStore[this.hyperAlive];
var rel_y = length * Plane.hyperSinStore[this.hyperAlive];
		this.rod = [this.pos[0]+ rel_x, this.pos[1] + rel_y];
		// if (this.rod_history.length < 1000) {
			// this.rod_history.push([this.rod[0], this.rod[1]]);
		// }
	}

	Plane.prototype.draw = function (gameCtx, paintCtx) {
    // gameCtx.beginPath();
    // gameCtx.arc( this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false );
		// gameCtx.fillStyle = this.color;
    // gameCtx.fill();
		// this.drawLine(gameCtx, this.rod, this.pos)
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


			paintCtx.fillRect(
				this.rod[0],
				this.rod[1],
				Plane.PIXEL_DIM[0],
				Plane.PIXEL_DIM[1]
			)

	};

	Plane.prototype.randomcolor = function ( color) {
		// if (this._colorRepeat === 0) {
		// 	this._colorRepeat += 1;
		// 	return Plane.COLORS[0]
		// } else if (this._colorRepeat % repeat === 0){
		// 	this._colorRepeat = 1;
		// 	return Plane.COLORS[Math.floor(Math.random() * Plane.COLORS.length)]
		// }
		// 	this._colorRepeat += 1;
		// return Plane.COLORS[3]
		if (color) {
			return color
		}

		if (this.colorIdx % Plane.COLORS.length === 0) {
			this.colorIdx = 0;
		}
		var result = Plane.COLORS[this.colorIdx];
		this.colorIdx += 1;
		return result;


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
		"#FDFD96",
		"#0578A6",
		"#729980",
		"#D40D12",
		"#6495ED",
		"#FFDEAD",
		"#F49AC2",
		"#FFDE00",
		'#FFF'
	];

})();
