(function() {
	if (typeof Ace === 'undefined') {
		Ace = {};
	}

	var Plane = Ace.Plane = function (options) {
		this.colorIdx = 0;
		this.pos = [options.pos[0] - this.findRadius(), options.pos[1]]
		this.startPos = this.pos.slice(0);
		options.color = Ace.Util.COLORS[this.colorIdx];
		options.radius = Plane.RADIUS;
		options.vel = this.velFn;
		Ace.MovingObject.call(this, options)
		this.rod = [this.pos[0] + Plane.ROD_LENGTH, this.pos[1]]
		this.hyperAlive = false;
		this._path = [];
	}

	Ace.Util.inherits(Plane, Ace.MovingObject);

	Plane.RADIUS = 10;

	Plane.amplitude = 0.8;
	Plane.period = 360 * 2;

	Plane.HYPER_PERIOD = Plane.period * (5);
	Plane.hyperDrift = 0;

	Plane.ROD_MULT = 1
	Plane.ROD_LENGTH = 300;
	Plane.ROD_WIDTH = 1;
	Plane.rodDrift = 0;

	Plane.spiralToggle = false;
	Plane.SPIRAL_PERIOD = Plane.period * (1/3);
	Plane.SPIRAL_AMP = .7;

	Plane.colorMult = .5;
	Plane.COLOR_PERIOD = Plane.period * Plane.colorMult;
	Plane.PIXEL_DIM = 5;

	Plane.sinStore = [];
	Plane.cosStore = [];
	(function () {
		for (var i = 0; i <= Plane.period; i++) {
			var rad = 2 * Math.PI * (i / Plane.period);
			Plane.sinStore.push(Math.sin(rad))
			Plane.cosStore.push(Math.cos(rad))
		}
	})();

	Plane.hyperSinStore = [];
	Plane.hyperCosStore = [];

	(function () {
		for (var i = 0; i <= Plane.HYPER_PERIOD; i++) {
			var rad = 2 * Math.PI * (i / Plane.HYPER_PERIOD);
			Plane.hyperSinStore.push(Math.pow(Math.sin(rad + (Math.PI * 0)), 1));
			Plane.hyperCosStore.push(Math.pow(Math.cos(rad + (Math.PI * 0)), 1));
		}
	})();

	Plane.rodSinStore = [];
	Plane.rodCosStore = [];
	(function () {
		for (var i = 0; i <= (Plane.period * Plane.ROD_MULT); i++) {
			var rad = 2 * Math.PI * (i / (Plane.period * Plane.ROD_MULT));
			Plane.rodSinStore.push(Math.sin(rad));
			// Plane.rodCosStore.push(Math.cos(rad));
			Plane.rodCosStore.push(Math.pow(Math.cos(rad), 1));
		}
	})();

	Plane.spiralSinStore = [];
	Plane.spiralCosStore = [];
	(function () {
		for (var i = 0; i <= Plane.SPIRAL_PERIOD; i++) {
			var rad = 2 * Math.PI * (i / Plane.SPIRAL_PERIOD)

			Plane.spiralSinStore.push(Math.pow(Math.sin(rad + (Math.PI * 0)), 1));
			Plane.spiralCosStore.push(Math.pow(Math.cos(rad + (Math.PI * 0)), 1));
		}
	})();

	Plane.prototype.drawMid = function () {
		var ctx = $('#paint-canvas')[0].getContext('2d');
		var radius = this.findRadius();

		Ace.Util.drawLine(
			ctx,
			[0, this.startPos[1]],
			[Ace.Game.DIM_X, this.startPos[1]]
		);

		Ace.Util.drawLine(
			ctx,
			[this.startPos[0] + radius, 0],
			[this.startPos[0] + radius, Ace.Game.DIM_Y]
		);

	}

	Plane.prototype.findRadius = function () {
		var d_x = (360 / Math.PI)*(Plane.amplitude * (Plane.period / 360));
		var r = d_x / 2;
		return r;
	}

	Plane.prototype.velFn = function () {
		if (this._aliveFor === false) {
			this._aliveFor = 0;
			this.spiralAliveFor = 0;
			this._vel = [0,0];
			this.colorAliveFor = 0;
		} else if (this._aliveFor > 0 && this._aliveFor % Plane.period  === 0) {
			this._aliveFor = 1 ;
			// debugge
			// this.pos = this.startPos.slice(0);

		}	else {
			this._aliveFor += 1;
		}

		if (this.colorAliveFor > 0 && this.colorAliveFor % Plane.COLOR_PERIOD === 0) {
			this.colorAliveFor = 1;
			this.color = Ace.Util.randomColor()
		} else {
			this.colorAliveFor += 1;
		}

		if (this.spiralAliveFor > 0 && this.spiralAliveFor % Plane.SPIRAL_PERIOD === 0) {
			this.spiralAliveFor = 1;
		} else {
			this.spiralAliveFor += 1;
		}
		// var spiralTheta = 2 * Math.PI * (this.spiralAliveFor / Plane.SPIRAL_PERIOD)
		// oscAmp = Math.min(oscAmp, 1)


		if (Plane.spiralToggle) {
			var oscAmpY = Plane.SPIRAL_AMP * Plane.spiralSinStore[this.spiralAliveFor]
			var oscAmpX = Plane.SPIRAL_AMP * Plane.spiralCosStore[this.spiralAliveFor];
			this._vel[0] = Plane.sinStore[this._aliveFor] * Plane.amplitude * oscAmpX;
			this._vel[1] = Plane.cosStore[this._aliveFor] * Plane.amplitude * oscAmpY;
		} else {
			this._vel[0] = Plane.sinStore[this._aliveFor] * Plane.amplitude;
			this._vel[1] = Plane.cosStore[this._aliveFor] * Plane.amplitude;
		}

		return this._vel;
	}
	Plane.prototype.move = function () {
		var vel = this.vel();
		var pos = [this.pos[0], this.pos[1]]
		// this._recordHistory(pos);
		this.pos[0] += vel[0];
		this.pos[1]	+= vel[1];
		this.updateRod();
	}

	Plane.prototype._recordHistory = function (pos) {
		if (this._path.length < 3000) {
			this._path.push(pos);
		} else {
			this._path.shift();
			this._path.push(pos);
		}
	}

	Plane.prototype.updateRod = function() {
		if (this.hyperAlive === false) {
			this.hyperAlive = 0;
			this.rodAlive = 0;
		} else if (this.hyperAlive > 0 && (this.hyperAlive % Plane.HYPER_PERIOD === 0)) {
			this.hyperAlive = 1 + Plane.hyperDrift;
		} else {
			this.hyperAlive += 1;
		}

		if (this.rodAlive > 0 && (this.rodAlive % (Plane.period * Plane.ROD_MULT) === 0)) {
			this.rodAlive = 1 + Plane.rodDrift;
		}	else {
			this.rodAlive += 1;
		}
		var length = Plane.ROD_LENGTH  * Plane.rodCosStore[this.rodAlive];
		// console.log(length)
		// var length = Plane.ROD_LENGTH  * (Math.pow(Math.sin(theta2),5) * Math.pow(Math.sin(theta2),3));
//
		var rel_x = length * Plane.hyperCosStore[this.hyperAlive];
		var rel_y = length * Plane.hyperSinStore[this.hyperAlive];

		this.rod = [this.pos[0]+ rel_x, this.pos[1] + rel_y];
	}

	Plane.prototype.draw = function (gameCtx, paintCtx) {
    gameCtx.beginPath();
    gameCtx.arc( this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false );
		gameCtx.fillStyle = this.color;
    gameCtx.fill();
		Ace.Util.drawLine(gameCtx, this.rod, this.pos, Plane.ROD_WIDTH, this.color)
		// this.drawPath(gameCtx, paintCtx, this._path, 300);
		// paintCtx.fillRect(this.rod[0] ,this.rod[1] ,5,5)
		// debugger

		this.drawPoint(gameCtx, paintCtx);
  };

	Plane.prototype.drawHistory = function () {

	};

	Plane.prototype.drawPoint = function (gameCtx, paintCtx) {
			paintCtx.fillStyle = this.color;
			gameCtx.fillStyle = this.color;
			paintCtx.fillRect(
				this.rod[0],
				this.rod[1],
				Plane.PIXEL_DIM,
				Plane.PIXEL_DIM
			)
	};

})();
