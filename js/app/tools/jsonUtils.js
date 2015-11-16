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
	module.prototype.getOrderedKeys = function(jsonTree) {
		return this.getValueKeys(jsonTree).sort().concat(this.getObjectKeys(jsonTree).sort());
	};
	module.prototype.getAllKeys = function(jsonTree) {
		return this.getValueKeys(jsonTree).concat(this.getObjectKeys(jsonTree));
	};
	module.prototype.getObjectKeys = function(jsonTree) {
		return this.getKeys(jsonTree, this.isObjectKey);
	};
	module.prototype.getValueKeys = function(jsonTree) {
		return this.getKeys(jsonTree, this.isValueKey);
	};
	module.prototype.getKeys = function(jsonTree, conditionFunction) {
		var result = [];
		_.each(jsonTree, function(value, prop) {
			if (conditionFunction(jsonTree, prop)) {
				result.push(prop);
			}
		});
		return result;
	};
	module.prototype.getFromJson = function(tree, keyList) {
		if (keyList.length === 0) {
			return tree;
		}
		return this.getFromJsonRecursive(tree, keyList.slice());
	};
	module.prototype.getFromJsonRecursive = function(tree, keyList) {
		if (keyList.length > 1) {
			return this.getFromJson(tree[keyList.shift()], keyList);
		} else if (keyList.length < 2 && tree) {
			return tree[keyList[0]];
		}
	};
	return new module();
});
