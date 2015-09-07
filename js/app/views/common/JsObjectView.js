define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var BaseObjectView = app.getBaseObjectView();
	var module = BaseObjectView.extend({
		template: templateLoader.get("jsObjectTemplate"),
		initialize: function() {
			BaseObjectView.prototype.initialize.call(this);
		},
		render: function() {
			BaseObjectView.prototype.render.call(this);
			this.renderSubViews();
			return this;
		},
		renderSubViews: function() {
			for (var i = 0; i < this.subViews.length; i++) {
				this.$(".js_jsContainer").append(this.subViews[i].render().$el);
			}
		},
	}); 
});