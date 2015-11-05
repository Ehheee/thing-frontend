define(["backbone", "app/views/common/BaseObjectView", "app/applicationContainer"], function(Backbone, BaseObjectView, app) {
	var module = BaseObjectView.extend({
		template: app.templateLoader.get("jsObjectTemplate"),
		initialize: function(options) {
			BaseObjectView.prototype.initialize.call(this, options);
		},
		render: function() {
			BaseObjectView.prototype.render.call(this);
			this.renderSubViews();
			return this;
		},
		renderSubViews: function() {
			if (this.expanded) {
				for (var i = 0; i < this.subViews.length; i++) {
					this.$(".js_jsContainer").append(this.subViews[i].render().$el);
				}
			}
		},
		getSubViewType: function(key) {
			if (utils.isObjectKey(this.model, key)) {
				return this.constructor;
			}
			if (utils.isValueKey(this.model, key)) {
				return app.KeyValueInputView;
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
	return module;
});