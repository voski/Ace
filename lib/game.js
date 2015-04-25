(function () {
	if (typeof Ace === 'undefined') {
		Ace = {};
	};

	var Game = Ace.Game = function () {
		this.hostiles = [];
		this.ships = [];
		this.addHostiles(Game.NUM_HOSTILES);
		// this.addShip({pos: [Ace.Game.DIM_X / 4, Ace.Game.DIM_Y / 4]});
		this.addShip({pos: [Ace.Game.DIM_X / 2, Ace.Game.DIM_Y / 2]});
	};

  Game.BG_COLOR = "#000";
  Game.DIM_X = 1000;
  Game.DIM_Y = 900;
  Game.FPS = 100;
  Game.NUM_HOSTILES = 3;


  Game.prototype.wrap = function (pos, width) {
    var x = pos[0];
    if (x < 0 || x > Game.DIM_X - width) {
      return true
    };

    return false
  };

  Game.prototype.addHostiles = function (num) {
  	for (var i = 0; i < num; i++) {
  		this.add( new Ace.Hostile({ game: this }));
  	};
  };

	Game.prototype.addShip = function (options) {
		this.add( new Ace.Plane({ game: this, pos: options.pos }));
	};

  Game.prototype.allObjects = function () {
  	return[].concat(this.hostiles).concat(this.ships)
  };

  Game.prototype.add = function (object) {
    if (object instanceof Ace.Hostile) {
      this.hostiles.push(object);
    } else if (object instanceof Ace.Plane) {
      this.ships.push(object);
    } else if (object instanceof Ace.Bullet) {
      this.bullets.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.randomPosition = function (options) {
  	var x = Game.DIM_X - options.x;
  	var y = options.y || Game.DIM_Y;
    return [
      x * Math.random(),
      y * Math.random()
    ];
  };

  Game.prototype.draw = function (ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    ctx.fillStyle = Game.BG_COLOR;
    ctx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.allObjects().forEach(function (object) {
    	object.draw(ctx);
    });
  };

  Game.prototype.step = function () {
    this.moveObjects();
    // this.checkCollisions();
  };

  Game.prototype.moveObjects = function () {
  	this.allObjects().forEach(function (object) {
  		object.move();
  	});
  };

})();
