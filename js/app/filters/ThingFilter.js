define(["backbone"], function(Backbone) {
	var application;
	Backbone.once("application:loaded", function(app) {
		application = app;
	});
	var module = function() {
	};
	module.prototype.onResult = function(data) {
		var models = [];
		for (var i = 0; i < data.length; i++) {
			models.push(new application.RecursiveModel(data[i]));
		}
		this.trigger("filter:newData", models);
	};
	_.extend(module.prototype, Backbone.Events);
	return module;
});
