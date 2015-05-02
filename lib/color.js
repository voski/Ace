(function() {
  if (typeof Hypo === "undefined") {
    Hypo = {};
  }

  var Gradient = Hypo.Gradient = function (options) {
    this.red = this.startRed = options.start[0];
    this.green = this.startGreen = options.start[1];
    this.blue = this.startBlue = options.start[2];

    this.endRed = options.end[0];
    this.endGreen = options.end[1];
    this.endBlue = options.end[2];

    this.dRed = (this.endRed - this.startRed) / 100;
    this.dGreen = (this.endGreen - this.startGreen) / 100;
    this.dBlue = (this.endBlue - this.startBlue) / 100;
  };

  Gradient.prototype.toString = function () {
    return 'rgb(' + [this.red, this.green, this.blue].toString() + ')'
  };

  Gradient.prototype.step = function () {
    if (this.red !== this.endRed) {
      this.red = Math.round((this.red + this.dRed) * 100) / 100
    }

    if (this.green !== this.endGreen) {
      this.green = Math.round((this.green + this.dGreen) * 100) / 100
    }

    if (this.blue !== this.endBlue) {
      this.blue = Math.round((this.blue + this.dBlue) * 100) / 100
    }

    if ((this.blue == this.endBlue) && (this.green == this.endGreen) && (this.red == this.endRed)) {
      this.reverse();
    }
  }

  Gradient.prototype.reverse = function () {
    var temp = this.endRed
    this.endRed = this.startRed
    this.startRed = temp

    temp = this.endGreen
    this.endGreen = this.startGreen
    this.startGreen = temp

    temp = this.endBlue
    this.endBlue = this.startBlue
    this.startBlue = temp

    this.dRed *= -1
    this.dGreen *= -1
    this.dBlue *= -1

  }


})();
