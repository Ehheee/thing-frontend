define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		events: {
			"click .js_save": "saveModel",
			"click .js_revert": "revertModel"
		},
		className: "js_jsContainer",
		render: function() {
			this.$el.html(this.subView.render().el);
			return this;
		},
		initialize: function(options) {
			this.filter = options.filter;
			this.listenTo(this.filter, "filter:newData", this.onNewData);  
		},
		onNewData: function(model) {
			this.model = model;
			if (this.subView) {
				this.subView.remove();
			}
			this.createSubView();
			this.render();
		},
		saveModel: function() {
			this.model.applyChanges();
		},
		revertModel: function() {
			this.model.revert();
		},
		createSubView: function() {
			this.subView = new app.JsObjectView({model: this.model, baseView: this});
		}
	});
	return module;
});
