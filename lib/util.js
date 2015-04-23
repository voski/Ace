(function () {
	if (typeof Asteroids === "undefined") {
		Asteroids = {};
	};

	var Util = Asteroids.Util = {};

	Util.prototype.inherits = function (ChildClass, ParentClass) {
		function Surrogate () {}};
		Surrogate.prototype = ParentClass.prototype;
		ChildClass.prototype = new Surrogate ();
	};

})();