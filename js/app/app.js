define(["backbone", "jquery", "app/router", "app/applicationContainer", "app/filters/ThingFilter", "app/views/common/JsonTreeContainer", "app/views/common/JsObjectView", "app/views/common/KeyValueInputView", "app/data/RecursiveModel"],
function(Backbone, $, router, app, ThingFilter, JsonTreeContainer, JsObjectView, KeyValueInputView, RecursiveModel) {
	var module = function() {
		//this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		console.log(JsonTreeContainer);
		app.JsonTreeContainer = JsonTreeContainer;
		app.JsObjectView = JsObjectView;
		app.ThingFilter = ThingFilter;
		app.RecursiveModel = RecursiveModel;
		app.KeyValueInputView = KeyValueInputView;
		console.log("running");
		var filter = new app.ThingFilter();
		var jsonContainer = new app.JsonTreeContainer({filter: filter, displayName: "bla"});
		jsonContainer.onNewData(new RecursiveModel({abc: "avc", acd: {aml: "sdfsd", ooo: {aaaa: "bbbb"}}}));
		$("body").append(jsonContainer.$el);
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
