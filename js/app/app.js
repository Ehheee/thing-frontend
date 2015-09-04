define(["backbone", "jquery"], function(Backbone, $) {
	var module = function() {
		this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
