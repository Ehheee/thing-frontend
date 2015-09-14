define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		events: {
			"blur .js_keyInput": "onKeyInput"
		},
		render: function() {
			this.setElement(this.template({}));
			this.$(".js_keyInput").val(this.key);
			this.$el.css("margin-left", (10*this.depth) + "px");
			return this;
		},
		initialize: function(options) {
			this.baseModel = options.baseModel;
			this.key = options.key;
			this.keyList = options.keyList.slice();
			this.depth = this.keyList.length();
			this.keyList.push(this.key);
		},
		setRemoved: function() {
			this.$el.addClass("toBeRemoved");
			this.baseModel.remove(this.keyList.slice());
			this.toBeRemoved = true;
		},
		onKeyInput: function(evt) {
			var key = this.$(".js_keyInput").val();
			if (key !== this.key) {
				this.baseModel.renameKey(this.keyList, this.key, key);
				this.trigger("view:changedKey");
			}
		},
	});
	return module;
});
