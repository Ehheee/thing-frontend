define(["backbone", "app/views/common/BaseObjectView", "app/applicationContainer"], function(Backbone, BaseObjectView, app) {
	var module = BaseObjectView.extend({
		events: {
			"click .expandButton": "onExpand"
		},
		template: app.templateLoader.get("jsObjectTemplate"),
		initialize: function(options) {
			BaseObjectView.prototype.initialize.call(this, options);
		},
		render: function() {
			BaseObjectView.prototype.render.call(this);
			this.expandButton = this.$(".expandButton");
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
		},
		generateSubViews: function() {
			var keys = app.jsonUtils.getOrderedKeys(this.model[this.key]);
			for (var i = 0; i < keys.length; i++) {
				var subView = this.getSubView(keys[i]);
				this.appendSubView(subView);
			}
		},
		appendSubView: function(view) {
			view.render();
			var a = 0;
			this.$el.children(".jsonContent").append(view.$el);
			view.delegateEvents();
		},
		showSubViews: function() {
			for (var i = 0; i < this.subViews.length; i++) {
				this.subViews[i].$el.show();
			}
		},
		onExpand: function(evt) {
			evt.stopPropagation();
			this.switchExpand();
		},
		switchExpand: function() {
			this.expanded ? this.unexpand() : this.expand();
		},
		expand: function() {
			this.expanded = true;
			this.generateSubViews();
			this.showSubViews();
			this.expandButton.addClass("expanded");
			this.expandButton.text("-");
		},
		unexpand: function() {
			this.expanded = false;
			this.hideSubViews();
			this.expandButton.removeClass("expanded");
			this.expandButton.text("+");
		},
		
	});
	return module;
});