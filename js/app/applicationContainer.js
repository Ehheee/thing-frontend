define(["app/data/RecursiveModel"], function() {
	var modules = {
		"RecursiveModel": "app/data/RecursiveModel",
		"jsonUtils": "app/tools/jsonUtils"
	};
	var module = {
		
	};
	_.each(modules, function(value, key) {
		key = "get" + key.charAt(0).toUpperCase() + key.slice(1);
		module[key] = function() {
			return require(value);
		};
	});
	return module;
});