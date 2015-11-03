define(["backbone", "jquery", "app/router", "app/applicationContainer"], function(Backbone, $, router, app) {
	var module = function() {
		//this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		console.log("running");
		var filter = new app.ThingFilter();
		var jsonContainer = new app.JsonTreeContainer({filter: filter});
		jsonContainer.onNewData({abc: "avc", acd: {aml: "sdfsd", ooo: {aaaa: "bbbb"}}});
		$("body").append(jsonContainer.$el);
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
