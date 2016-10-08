var app = window.app;
var viewModel = new app.ViewModel({
	login: 'default login',
	password: null
});
var templateUrl = 'templates/layout.html';
$.get(templateUrl).then(function(tpl) {
	var $root = $('#app');
	var view = new app.View(tpl);
	view.bind(viewModel);
	view.render($root);
});

setTimeout(function() {
	viewModel.set('login', 1111);
	viewModel.set('password', 121212312);
}, 3000)

window.testViewModel = viewModel;