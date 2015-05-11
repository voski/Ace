(function() {
  if (typeof Ace === "undefined") {
    Ace = {};
  }

  var Menu = Ace.Menu = {

    initialize: function () {
      this.$el = $('#controls')
      this.$el.draggable();
      this.setupPlaneOptions(this.$el.find('fieldset.plane-set'))
      this.setupHypoOptions(this.$el.find('fieldset.hypo-set'))
      this.setupGeneralOptions(this.$el.find('fieldset.general'))
    },

    setupGeneralOptions: function($el) {
      this.hookSteps($el);
      this.hookDim($el);
    },

    hookDim: function ($el) {
      var x = $el.find("#dim-x");
      var x = $el.find("#dim-y");
    },

    setupPlaneOptions: function ($el) {
      this.planeDisplayToggle($el.find('#plane-toggle'))
    },

    planeDisplayToggle: function ($el) {
      var updateText = function () {
        if (Ace.Plane.drawPlane) {
          $el.text('Hide')
        } else {
          $el.text('Show')
        }
      }

      updateText();

      $el.on('click', function(e) {
        e.preventDefault();
        Ace.Plane.toggleDisplay();
        updateText();
      })
    },

    setupHypoOptions: function ($el) {
    },

    hookSteps: function ($el) {
      var spinner = $el.find('#steps');
      spinner.val(Ace.Plane.steps);
      spinner.change(function(e) {
        var val = $(e.currentTarget).val();
        Ace.Plane.steps = val;
      })
    },


  };
})();
