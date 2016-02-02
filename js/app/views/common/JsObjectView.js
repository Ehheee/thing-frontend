define(["backbone", "app/views/common/BaseObjectView", "app/applicationContainer", "app/views/common/KeyValueInputView"], function(Backbone, BaseObjectView, app, KeyValueInputView) {
	var module = BaseObjectView.extend({
		events: {
			"click .expandButton": "onExpand"
		},
		template: app.templateLoader.get("jsObjectTemplate"),
		className: "jsObject ",
		initialize: function(options) {
			this.subViews = {};
			BaseObjectView.prototype.initialize.call(this, options);
		},
		render: function() {
			BaseObjectView.prototype.render.call(this);
			this.expandButton = this.$(".expandButton");
			if (this.expanded) {
				this.expand();
			}
			return this;
		},
		getSubViewType: function(key) {
			if (app.jsonUtils.isObjectKey(this.model, key)) {
				return this.constructor;
			}
			if (app.jsonUtils.isValueKey(this.model, key)) {
				return KeyValueInputView;
			}
		},
		createSubView: function(key) {
			var k = this.keyList.slice();
			k.push(key);
			var ViewType = this.getSubViewType(key);
			this.subViews[key] = new ViewType({baseModel: this.baseModel, keyList: k, baseView: this.baseView});
			return this.subViews[key];
		},
		getSubView: function(key) {
			var subView = this.subViews[key];
			if (!subView) {
				subView = this.createSubView(key);
			}
			return subView;
		},
		generateSubViews: function() {
			var keys = app.jsonUtils.getOrderedKeys(this.model);
			for (var i = 0; i < keys.length; i++) {
				var subView = this.getSubView(keys[i]);
				this.appendSubView(subView);
			}
		},
		appendSubView: function(view) {
			view.render();
			console.log(this.$el.children(".js_jsContainer"));
			//this.$el.css("margin-left", (10*this.depth) + "px");
			this.$el.children(".js_jsContainer").append(view.$el);
			view.delegateEvents();
		},
		showSubViews: function() {
			this.$(".js_jsContainer").show();
			/*
			_.each(this.subViews, function(view) {
				console.log(view.$el);
				view.$el.show();
				view.$el.css({display: ""});
			});
			*/
		},
		hideSubViews: function() {
			this.$(".js_jsContainer").hide();
			/*
			_.each(this.subViews, function(view) {
				view.$el.hide();
			});
			*/
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