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
		getSubViewType: function(key) {
			if (utils.isObjectKey(this.model, key)) {
				return app.getJsObjectView();
			}
			if (utils.isValueKey(this.model, key)) {
				return app.getKeyValueInputView();
			}
		},
		createSubView: function(key) {
			var k = this.keyList.slice();
			k.push(key);
			var ViewType = this.getSubViewType(key);
			this.subViews[key] = new ViewType({model: this.model[key], keyList: k, baseView: this.baseView});
		},
		getSubView: function(key) {
			var subView = this.subViews[key];
			if (!subView) {
				this.createSubView(key);
			}
			return subView;
		}
	}); 
});