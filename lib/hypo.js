(function(){
  if (typeof Ace === "undefined") {
    Ace = {};
  }

  // var Hypo = Ace.Hypo = function (n, r, k) {
  //   this.generatePoints(n, r, k);
  //   this.setCanvas();
  //   this.drawPoints();
  // };
  var Hypo = Ace.Hypo = function (n, a, b, c, d, j, k, amp, loops) {
    this.generatePoints(n, a, b, c, d, j, k, amp, loops);
    this.setCanvas();
    this.drawPoints();
  };

  Hypo.prototype.generatePoint = function (theta, r, k) {
    var _k = k - 1;
    var x = r*((_k)*Math.cos(theta) + Math.cos((_k)*theta)) + Ace.Game.DIM_X / 2;
    var y = r*((_k)*Math.sin(theta) - Math.sin((_k)*theta)) + Ace.Game.DIM_Y / 2;
    return [x, y];
  };

  Hypo.prototype.generatePoint2 = function (theta, a, b, c, d, j, k, amp) {
    var x = (Math.cos(a * theta) - Math.pow(Math.cos(b * theta), j) * amp) + Ace.Game.DIM_X / 2;
    var y = (Math.sin(c * theta) - Math.pow(Math.sin(d * theta), k) * amp) + Ace.Game.DIM_Y / 2;

    return [x, y]
  }

  Hypo.prototype.generatePoints = function (n, a, b, c, d, j, k, amp, loops) {
    this.points = [];
    for (var i = 0; i < n * loops; i++) {
      var d_theta = i / n
      var theta = 2 * Math.PI * d_theta;
      // var point = this.generatePoint(theta, r, k)
      var point = this.generatePoint2(theta, a, b, c, d, j, k, amp)
      this.points.push([point[0], point[1]])
    }
  };

  Hypo.prototype.setCanvas = function () {
    this.ctx = document.getElementById('game-canvas').getContext("2d");
  };

  Hypo.prototype.drawPoints = function () {
    this.ctx.fillStyle = 'cornflowerblue'
    this.points.forEach(function (point) {
      this.ctx.fillRect(
        point[0],
        point[1],
        1,
        1
      )
    }.bind(this))
  };

})();
