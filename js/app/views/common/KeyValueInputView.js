define(["backbone", "app/views/common/BaseObjectView", "app/applicationContainer"], function(Backbone, BaseObjectView, app) {
	var module = BaseObjectView.extend({
		template: app.templateLoader.get("keyValueInputTemplate"),
		buttonTemplate: app.templateLoader.get("buttonTemplate"),
		className: "keyValueInput",
		events: {
			"blur .js_valueInput": "onValueInput"
		},
		initialize: function(options) {
			BaseObjectView.prototype.initialize.call(this, options);
		},
		render: function() {
			BaseObjectView.prototype.render.call(this);
			this.$(".js_valueInput").val(this.model);
			return this;
		},
		addButtons: function() {
			
		},
		onValueInput: function() {
			var value = this.$(".js_valueInput").val();
			this.baseModel.setField(this.keyList.slice(), value);
			this.listenClearAndApply();
		}
	});
	return module;
});