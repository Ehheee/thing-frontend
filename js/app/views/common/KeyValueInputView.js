require(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		template: _.template(app.templateLoader.get("keyValueInputTemplate")),
		buttonTemplate: _.template(app.templateLoader.get("buttonTemplate")),
		events: {
			"blur .js_valueInput": "onValueInput"
		},
		render: function() {
			this.setElement(this.template({}));
			this.$(".js_keyInput").val(this.key);
			return this;
		},
		addButtons: function() {
			
		},
		onValueInput: function() {
			var value = this.$(".valueInput").val();
			this.baseModel.setField(this.keyList, value);
		}
	});
	return module;
});