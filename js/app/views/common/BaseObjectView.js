define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		events: {
			"blur .js_keyInput": "onKeyInput"
		},
		render: function() {
			this.setElement(this.template({key: (this.key ? this.key: this.displayName)}));
			this.$el.css("margin-left", (10*this.depth) + "px");
			return this;
		},
		initialize: function(options) {
			this.baseModel = options.baseModel;
			this.baseView = options.baseView;
			if (options.keyList) {
				this.keyList = options.keyList.slice();
				this.key = this.keyList[this.keyList.length - 1];
				this.depth = this.keyList.length;
			}
			this.displayName = options.displayName;
			this.model = this.baseModel.getField(this.keyList);
		},
		setRemoved: function() {
			this.$el.addClass("toBeRemoved");
			this.baseModel.remove(this.keyList.slice());
			this.toBeRemoved = true;
			this.listenClearAndApply();
		},
		onKeyInput: function(evt) {
			//No modifying array keys
			if (_.isArray(this.baseModel.getField(this.keyList))) {
				return;
			}
			var key = this.$(".js_keyInput").val();
			if (key !== this.key) {
				this.baseModel.renameKey(this.keyList, this.key, key);
				this.trigger("view:changedKey");
				this.listenClearAndApply();
			}
		},
		applyChanges: function() {
			if (this.toBeRemoved) {
				this.remove();
			} else {
				this.resetClasses();
				this.resetChangeFlags();
			}
		},
		revertChanges: function() {
			if (this.toBeAdded) {
				this.remove();
			} else {
				this.resetClasses();
				this.resetChangeFlags();
			}
		},
		resetClasses: function() {
			this.$el.removeClass("toBeRemoved toBeAdded toBeChanged");
		},
		resetChangeFlags: function() {
			this.toBeRemoved = false;
			this.toBeChanged = false;
		},
		remove: function() {
			this.trigger("view:removed");
			Backbone.View.remove.call(this);
		},
		listenClearAndApply: function() {
			this.listenToOnce(this.baseModel, "model:save", this.applyChanges);
			this.listenToOnce(this.baseModel, "model.revert", this.revertChanges);
		}
	});
	return module;
});
