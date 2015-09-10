define(["backbone", "jquery", "app/router", "app/applicationContainer"], function(Backbone, $, router, app) {
	var module = function() {
		//this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		console.log("running");
		console.log(app.getRecursiveModel());
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
