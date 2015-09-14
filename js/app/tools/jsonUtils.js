define([], function() {
	var module = function() {};
	module.prototype.removeNullValues = function(tree) {
		_.each(tree, function(value, prop) {
			if (value === null) {
				delete tree[prop];
				return;
			}
			if (_.keys(value).length > 0) {
				this.removeNullValues(value);
			}
		}, this);
	};
	return new module();
});
