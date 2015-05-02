(function () {
	if (typeof Ace === 'undefined') {
		Ace = {};
	};

	var Game = Ace.Game = function () {
		this.hostiles = [];
		this.ships = [];
		this.addHostiles(Game.NUM_HOSTILES);
		this.addShip({pos: [Ace.Game.DIM_X / 2, Ace.Game.DIM_Y / 2]});
	};

  Game.BG_COLOR = "#000";
  Game.DIM_X = 1500;
  Game.DIM_Y = 1000;
  Game.FPS = 150;
  Game.NUM_HOSTILES = 0;


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

  Game.prototype.draw = function (gameCtx, paintCtx) {
    gameCtx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
    // gameCtx.fillStyle = Game.BG_COLOR;
    // gameCtx.fillRect(0, 0, Game.DIM_X, Game.DIM_Y);
		this.allObjects().forEach(function (object) {
    	object.draw(gameCtx, paintCtx);
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
