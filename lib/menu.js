(function() {
  if (typeof Ace === "undefined") {
    Ace = {};
  }

  var Menu = Ace.Menu = {
    initialize: function (gameView) {
      this.gameView = gameView;
      this.$el = $('#controls')
      this.$el.draggable();
      this.setupPlaneOptions(this.$el.find('fieldset.plane-set'))
      this.setupHypoOptions(this.$el.find('fieldset.hypo-set'))
      this.setupGeneralOptions(this.$el.find('fieldset.general'))
    },

    setupGeneralOptions: function($el) {
      this.hookSteps($el);
      this.hookStartStop($el);
      this.hookClear($el);
    },

    hookClear: function ($el) {
      var btn = this.$el.find("button.clear-btn")
      btn.click(function(e){
        this.gameView.clearCanvas();
      }.bind(this))
    },

    hookStartStop: function ($el) {
      var btn = this.$el.find("button.start-stop-btn");

      var toggleText = function ($el) {
         $el.html() === "Stop" ? $el.html("Start") : $el.html("Stop")
      }

      btn.click(function(e) {
        e.preventDefault();
        this.gameView.toggle();
        toggleText($(e.currentTarget))
      }.bind(this))
    },

    hookDim: function ($el) {
      var $x = $el.find("#dim-x");
      var $y = $el.find("#dim-y");
      $x.val(Ace.Game.DIM_X);
      $y.val(Ace.Game.DIM_Y);

      $x.change(function(e) {
        var val = parseInt($(e.currentTarget).val())
        Ace.Game.DIM_X = val;
      });

      $y.change(function(e) {
        var val = parseInt($(e.currentTarget).val())
        Ace.Game.DIM_Y = val;
      });
    },

    setupPlaneOptions: function ($el) {
      this.planeDisplayToggle($el.find('#plane-toggle'))
      this.planePeriodControl($el.find('#plane-mult'))
    },

    planePeriodControl: function ($el) {
      $el.change(function(e) {
        var val = $(e.currentTarget).val();
        debugger
        Ace.Plane.periodMult = parseInt(val);
      })
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
        Ace.Plane.steps = parseInt(val);
      })
    },
  };
})();
