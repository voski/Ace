(function() {
  if (typeof Ace === "undefined") {
    Ace = {};
  }

  var Menu = Ace.Menu = function () {
    this.$menu = $('#controls');
    this.$menu.draggable();
    this.setupPlaneFieldSet(this.$menu.find('fieldset.plane-set'))
  };

  _.extend(Menu, {
    setupPlaneFieldSet: function (fieldSet){

    }

  });
})();
