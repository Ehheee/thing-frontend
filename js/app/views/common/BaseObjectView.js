define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		events: {
			"blur .js_keyInput": "onKeyInput"
		},
		render: function() {
			this.setElement(this.template({}));
			this.$(".js_keyInput").val(this.key);
			return this;
		},
		initialize: function(options) {
			this.baseModel = options.baseModel;
			this.key = options.key;
			this.keyList = options.keyList.slice();
			this.depth = this.keyList.length();
			this.keyList.push(this.key);
			
		},
		onKeyInput: function(evt) {
			var key = this.$(".js_keyInput").val();
			this.baseModel.renameKey(this.keyList, this.key, key);
		},
	});
	return module;
});
