require(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		template: _.template(app.templateLoader.get("keyValueInputTemplate")),
		buttonTemplate: _.template(app.templateLoader.get("buttonTemplate")),
		render: function() {
			this.setElement(this.template({}));
			this.$(".js_keyInput").val(this.key);
			return this;
		},
		addButtons: function() {
			
		}
	});
	return module;
});