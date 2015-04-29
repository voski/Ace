(function() {
  if (typeof Ace === "undefined") {
    Ace = {};
  };

  var Rod = Ace.Rod = function (options) { // TODO diff trig fns
    this.plane = options.plane;
    this.length = options.length;
    this.width = options.width || 1;
    this.drift = options.drift || 0;
    this.alive = 0;
    this.period = Ace.Plane.period * options.mult; // period needs to be instance var of plane
    this.buildTrigCache(options.res);
  };

  _.extend(Rod.prototype,
    {
      buildTrigCache: function (res) {
        if (!this._cacheBuilt) {
          this.sinCache = [];
          this.cosCache = [];
          this._cacheBuilt = true;
          // debugger
        }

        for (var i = 0; i <= 360 ; i++) {
          var rad = 2 * Math.PI * (i / (360 * res))
          this.sinCache.push(Math.sin(rad));
          this.cosCache.push(Math.cos(rad));
        }
      },

      updateRod: function () {
        if (this.alive > 0 && (this.alive % this.period)) {
          this.alive = 1 + this.drift;
        } else {
          this.alive += 1;
        }

        var cos = this.cosCache[this.alive];
        var sin = this.sinCache[this.alive];
        var length = this.length * cos;
        var rel_x = length * cos;
        var rel_y = length * sin;
        this.pos = [this.plane.pos[0] + rel_x, this.plane.pos[1] + rel_y];
      },

    }
  );


})();
