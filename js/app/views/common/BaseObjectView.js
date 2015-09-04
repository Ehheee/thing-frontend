define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		events: {
			"blur .js_keyInput": ""
		},
		render: function() {
			this.setElement(this.template({}));
			this.$(".js_keyInput").val(this.key);
			return this;
		},
		initialize: function() {
			
		}
	});
	return module;
});
