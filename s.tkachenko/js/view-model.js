(function (app) {
	var ViewModel = function(config) {

		for (var key in config) {
			this[key] = config[key];
		}

		this.set = function(prop, value) {
			this[prop] = value;
			console.log(this);
			this.onChange(prop, value);
		};

		this.onChange = function(prop, value) {
			throw 'this method has been overridden in the view';
		}
	}
	app.ViewModel = ViewModel;
})(window.app);