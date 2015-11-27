define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = function(data) {
		this.data = data;
		this.changes = [];
	};
	module.prototype.setField = function(keyList, value) {
		var oldValue = app.jsonUtils.getFromJson(this.data, keyList);
		var newValue = app.jsonUtils.stringToType(value);
		if (newValue !== oldValue) {
			app.jsonUtils.setField(this.data, keyList, value);
			this.changes.push({keyList: keyList, value:oldValue});
			this.changed = true;
		}
	};
	module.prototype.getField = function(keyList) {
		return app.jsonUtils.getFromJson(this.data, keyList);
	};
	module.prototype.renameKey = function(keyList, oldKey, newKey) {
		var keys = keyList.splice();
		if (oldKey !== newKey) {
			app.jsonUtils.renameKey(this.data, keys, newKey);
			keys.pop();
			keys.push(newKey);
			this.changes.push({keyList: keys, key: oldKey});
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
			this.trigger("model:save");
		}
		if (this.removed) {
			this.trigger("model:remove");
		}
		app.jsonUtils.removeNullValues(tree);
		this.resetChangeFlags();
	};
	module.prototype.revertChanges = function() {
		while (this.changes.length > 0) {
			var change = this.changes.pop();
			if (change.value) {
				app.jsonUtils.setField(this.data, change.keyList, change.value);
			} else if (change.key) {
				app.jsonUtils.renameKey(this.data, keyList, change.key);
			}
		}
		this.resetChangeFlags();
		this.trigger("model:revert");
	};
	module.prototype.resetChangeFlags = function() {
		this.removed = false;
		this.changed = false;
	};
	_.extend(module.prototype, Backbone.events);
	return module;
});
