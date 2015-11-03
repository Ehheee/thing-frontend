define(["backbone", "app/tools/jsonUtils", "app/templateLoader"],
function(Backbone, jsonUtils, templateLoader) {
	var module = {
		"jsonUtils": jsonUtils,
		"templateLoader": templateLoader,
	};
	Backbone.trigger("application:loaded", module);
	return module;
});