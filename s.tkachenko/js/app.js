var View = function(html) {
	this.bindEls = {};
	var $dom = this.dom = $(html);

	this.bind = function(viewModel) {
		viewModel.onChange = this.onChange.bind(this);
		this.viewModel = viewModel;
		this.initBind();
	};
	this.render = function($root) {
		$root.html($dom);
	}

	this.initBind = function() {
		this.bindValue();
	}

	this.bindValue = function() {
		var self = this;
		var bindEls = $dom.find('[st-value]');
		bindEls.each(function(index, el) {
			var prop = el.getAttribute('st-value');
			self.bindEls[prop] = self.bindEls[prop] || [];
			self.bindEls[prop].push(el);
			el.value = self.viewModel[prop];
			el.onchange = function(e) {
				var el = e.target;
				var val = el.value;
				self.viewModel[prop] = val;
				console.log(self.viewModel);
			}
		});
	}

	this.onChange = function(prop, value) {
		var els = this.bindEls[prop];
		if (els) {
			els.forEach(function(el) {
				el.value = value;
			});
		}
	}
}
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
var viewModel = new ViewModel({
	login: 'default login',
	password: null
});
var templateUrl = 'templates/layout.html';
$.get(templateUrl).then(function(tpl) {
	var $root = $('#app');
	var view = new View(tpl);
	view.bind(viewModel);
	view.render($root);
});

setTimeout(function() {
	viewModel.set('login', 1111);
	viewModel.set('password', 121212312);
}, 3000)

window.testViewModel = viewModel;