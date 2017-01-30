define(["jquery", "underscore", "backbone", "app/applicationContainer" ], function($, _, Backbone, app) {
	var module = Backbone.View.extend({
		tagName: "div",
		className: "contextMenu",
		itemTemplate: app.templateLoader.get("contextMenuItem"),
		linkTemplate: app.templateLoader.get("linkTemplate"),
		render: function() {
			this.$el.css({"position": "absolute", "top": this.yPosition, "left": this.xPosition, "background-color": "#999"});
			this.menuItems = [];
			for (var i = 0; i < this.choices.length; i++) {
				var choice = this.choices[i];
				var itemTemplate;
				if (choice.type && choice.type === "link") {
					itemTemplate = $(this.linkTemplate({text: choice.text, href: choice.href}));
				} else {
					itemTemplate = $(this.itemTemplate({choice: choice}));
				}
				this.$el.append(itemTemplate);
				this.menuItems.push(itemTemplate);
				itemTemplate.on("click", this.onClick);

			}
			$("body").append(this.$el);
			return this;
		},
		initialize: function(options) {
			if ($("div.contextMenu").length) {
				this.remove();
				return;
			}
			_.extend(this, options);
			this.render();
			var context = this;
			$("html").one("click", function() {
				context.remove();
			});

		},
		events: {
			"click": "menuClick"
		},
		menuClick: function(evt) {
			evt.stopPropagation();
			var matchedEvent = false;
			for (var i = 0; i < this.menuItems.length; i++) {
				if (this.menuItems[i].html() === evt.target.innerHTML) {
					this.trigger(this.triggerChannel + ":" + evt.target.innerHTML);
				}
			}
			this.remove();
		}

	});

	return module;
});
