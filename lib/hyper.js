(function() {
  if (typeof Ace === 'undefined') {
    Ace = {}
  }

  var Hyper = Ace.Hyper = function (options) {
    this.plane = options.plane;
    this.radius = options.radius || 20
  };
})
