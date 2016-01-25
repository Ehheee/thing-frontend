define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.View.extend({
		className: "arrayView",
		render: function() {
			this.renderSubViews();
			return this;
		},
		renderSubViews: function() {
			for (var i = 0; i < this.subViews.length; i++) {
				this.$el.append(this.subViews[i].render().$el);
			}
		},
		initialize: function(options) {
			this.filter = options.filter;
			this.SubView = options.SubView;
			this.subViews = [];
			this.listenTo(this.filter, "filter:newData", this.onNewData);  
		},
		onNewData: function(model) {
			this.model = model;
			this.removeSubViews();
			this.createSubViews();
			this.render();
		},
		createSubViews: function() {
			for (var i = 0; i < this.model.length; i++) {
				this.createSubView(this.model[i]);
			}
		},
		createSubView: function(modelItem) {
			this.subViews.push(new this.SubView({model: modelItem}));
		},
		removeSubView: function(key) {
			this.subViews[key].remove();
			this.subViews.splice(key, 1);
		},
		removeSubViews: function() {
			for (var i = 0; i < this.subViews.length; i++) {
				this.removeSubView(i);
			}
		}
	});
	return module;
});
