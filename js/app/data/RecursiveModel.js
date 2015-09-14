define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var jsonUtils = app.getJsonUtils();
	var module = function(data) {
		this.data = data;
		this.changes = [];
	};
	module.prototype.setField = function(keyList, value) {
		var oldValue = jsonUtils.getFromJson(keyList);
		var newValue = jsonUtils.stringToType(value);
		if (newValue !== oldValue) {
			app.jsonUtils.setField(this.data, keyList, value);
			this.changes.push({keyList: keyList, value:oldValue});
			this.changed = true;
		}
	};
	module.prototype.renameKey = function(keyList, oldKey, newKey) {
		if (oldKey !== newKey) {
			jsonUtils.renameKey(keyList, oldKey, newKey);
			keyList.pop();
			keyList.push(newKey);
			this.changes.push({keyList: keyList, key: oldKey});
			this.changed = true;
		}
	};
	module.prototype.remove = function(keyList) {
		if (!keyList || keyList.length < 1) {
			this.removed = true;
		} else {
			this.setField(keyList, null);
		}
	};
	module.prototype.applyChanges = function() {
		if (this.changed) {
			this.trigger("model:save", this);
		}
		jsonUtils.removeNullValues(tree);
		this.resetChangeFlags();
	};
	module.prototype.revert = function() {
		while (this.changes.length > 0) {
			var change = this.changes.pop();
			if (change.value) {
				jsonUtils.setField(this.data, change.keyList, change.value);
			} else if (change.key) {
				jsonUtils.renameKey(keyList, keyList[keyList.length - 1], change.key);
			}
		}
		this.resetChangeFlags();
	};
	module.prototype.resetChangeFlags = function() {
		this.removed = false;
		this.changed = false;
	};
	_.extend(module.prototype, Backbone.events);
});
