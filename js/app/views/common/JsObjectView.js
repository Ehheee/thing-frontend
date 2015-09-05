define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var BaseObjectView = app.getBaseObjectView();
	var module = BaseObjectView.extend({
		template: templateLoader.get("jsObjectTemplate"),
		initialize: function() {
			BaseObjectView.prototype.initialize.call(this);
		}
	}); 
});