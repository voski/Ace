(function() {
  if (typeof Ace === "undefined") {
    Ace = {};
  }

  var Menu = Ace.Menu = {

    initialize: function () {
      this.$menu = $('#controls')
      this.$menu.draggable();
      this.setupPlaneOptions(this.$menu.find('fieldset.plane-set'))
      this.setupHypoOptions(this.$menu.find('fieldset.hypo-set'))
    },

    setupPlaneOptions: function (fieldset) {
      console.log(fieldset)
    },

    setupHypoOptions: function (fieldset) {
      var spinner =fieldset.find('#speed').spinner({
        min: 1
      })

      spinner.spinner('value', 1)
    },


  };
})();
