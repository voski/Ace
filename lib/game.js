(function () {
	if (typeof Ace === 'undefined') {
		Ace = {};
	};

	var Game = Ace.Game = function () {
		this.hostiles = [];
		
		this.addHostiles(Game.NUM_HOSTILES);
	};

  Game.BG_COLOR = "#FFEF68";
  Game.DIM_X = 500;
  Game.DIM_Y = 900;
  Game.FPS = 32;
  Game.NUM_HOSTILES = 10;


  Game.prototype.wrap = function (pos) {
    var x = pos[0];
    if (x < 0 || x > Game.DIM_X - 40) {
      return true
    };

    return false
  };

  Game.prototype.addHostiles = function (num) {
  	for (var i = 0; i <= num; i++) {
  		this.add( new Ace.Hostile({ game: this }));
  	};
  };

  Game.prototype.allObjects = function () {
  	return this.hostiles
  };

  Game.prototype.add = function (object) {
    if (object instanceof Ace.Hostile) {
      this.hostiles.push(object);
    } else if (object instanceof Ace.Bullet) {
      this.bullets.push(object);
    } else if (object instanceof Ace.Plane) {
      this.ships.push(object);
    } else {
      throw "wtf?";
    }
  };

  Game.prototype.randomPosition = function (options) {
  	var x = options.x || Game.DIM_X;
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