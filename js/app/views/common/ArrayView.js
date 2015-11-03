define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		render: function() {
			
			return this;
		},
		renderSubViews: function() {
			
		},
		initialize: function(options) {
			this.filter = options.filter;
			this.listenTo(this.filter, "filter:newData", this.onNewData);  
		},
		onNewData: function(model) {
			this.model = model;
			this.removeSubViews();
			this.render();
		},
		removeSubView: function(key) {
			this.subViews[key].remove();
		},
		removeSubViews: function() {
			for (var i = 0; i < this.subViews.length; i++) {
				this.removeSubView(i);
			}
		}
	});
	return module;
});
