define(["backbone", "app/applicationContainer"], function(Backbone, app) {
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
			this.changed = true;
		}
	};
	module.prototype.apply = function() {
		if (this.changed) {
			Backbone.trigger("model:save", this);
		}
	};
	module.prototype.revert = function() {
		while (this.changes.length > 0) {
			var change = this.changes.pop();
			app.jsonUtils.setField(this.data, change.keyList, change.value);
		}
	};
	_.extend(module.prototype, Backbone.events);
});
