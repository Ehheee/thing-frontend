define(["backbone", "jquery", "app/router", "app/applicationContainer", "app/filters/ThingFilter", "app/views/common/JsonTreeContainer", "app/views/common/JsObjectView"],
function(Backbone, $, router, app, ThingFilter, JsonTreeContainer, JsObjectView) {
	var module = function() {
		//this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		console.log(JsonTreeContainer);
		app.JsonTreeContainer = JsonTreeContainer;
		app.JsObjectView = JsObjectView;
		app.ThingFilter = ThingFilter;
		console.log("running");
		var filter = new app.ThingFilter();
		var jsonContainer = new app.JsonTreeContainer({filter: filter});
		jsonContainer.onNewData({abc: "avc", acd: {aml: "sdfsd", ooo: {aaaa: "bbbb"}}});
		$("body").append(jsonContainer.$el);
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
