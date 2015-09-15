require(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var BaseObjectView = app.getBaseObjectView();
	var module = BaseObjectView.extend({
		template: _.template(app.templateLoader.get("keyValueInputTemplate")),
		buttonTemplate: _.template(app.templateLoader.get("buttonTemplate")),
		events: {
			"blur .js_valueInput": "onValueInput"
		},
		render: function() {
			BaseObjectView.prototype.render.call(this);
			this.$(".js_keyInput").val(this.key);
			return this;
		},
		addButtons: function() {
			
		},
		onValueInput: function() {
			var value = this.$(".valueInput").val();
			this.baseModel.setField(this.keyList.slice(), value);
			this.listenClearAndApply();
		}
	});
	return module;
});