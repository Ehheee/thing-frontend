define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var RecursiveModel = app.getRecursiveModel();
	var module = new function() {
	};
	module.prototype.onResult = function(data) {
		var models = [];
		for (var i = 0; i < data.length; i++) {
			models.push(new RecursiveModel(data[i]));
		}
		this.trigger("filter:newData", models);
	};
	_.extend(module.prototype, Backbone.Events);
	return module;
});
