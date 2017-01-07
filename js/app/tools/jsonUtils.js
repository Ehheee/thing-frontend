define([], function() {
	var module = function() {};
	module.prototype.stringToType = function(value) {
		var result = value;
		if (_.isString(value)) {
			value = value.toLowerCase();
			result = value === 'true' || (value === 'false' ? false : result);
			if ($.isNumeric(value)) {
				result = parseInt(value);
			}
		}
		return result;
	};
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
	module.prototype.isObjectKey = function(jsonTree, key) {
		return _.isObject(jsonTree[key]);
	};
	module.prototype.isValueKey = function(jsonTree, key) {
		return _.keys(jsonTree[key]).length < 1;
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
	module.prototype.setField = function(tree, keyList, value) {
		this.changeInJson(tree, keyList.splice(), value);
	};
	module.prototype.changeInJson = function(tree, keyList, value) {
		if (keyList.length > 1) {
			this.changeInJson(tree[keyList.shift()], keyList, value);
		} else {
			tree[keyList[0]] = value;
		}
	};
	module.prototype.renameKey = function(tree, keyList, newKey) {
		this.changeJsonKey(tree, keyList.splice(), newKey);
	};
	module.prototype.changeJsonKey = function(tree, keyList, newKey) {
		if (keyList.length > 1) {
			this.changeJsonKey(tree[keyList.shift()], keyList, newKey);
		} else {
			if (_.isArray(tree)) {
				throw Exceptions.JsonModifyingException("Modifying array keys is not supported");
			}
			var value = tree[keyList[0]];
			delete tree[keyList[0]];
			tree[newKey] = value;
		}
	};
	return new module();
});
