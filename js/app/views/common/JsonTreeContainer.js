define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var JsObjectView = app.getJsObjectView();
	var module = Backbone.View.extend({
		events: {
			"click .js_save": "saveModel",
			"click .js_revert": "revertModel"
		},
		render: function() {
			this.$(".js_jsContainer").html(this.subView.render().el);
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
			this.render();
		},
		saveModel: function() {
			this.model.save();
		},
		revertModel: function() {
			this.model.revert();
		},
		createSubView: function() {
			this.subView = new JsObjectView({model: this.model});
		}
	});
	return module;
});
