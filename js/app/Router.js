define(["backbone", "app/applicationContainer"], function(Backbone, app) {
	var module = Backbone.Router.extend({
	    routes: {
	        "thingtype/edit/(:type)": "showThingTypeCreate",
	        "test/": "test"
	    },
		initialize: function() {
            Backbone.on("router:navigate", this.navigate, this);
            this.mainView = new app.MainView();
            this.mainView.render();
        },
        showThingTypeCreate: function(type) {
            this.mainView.setView(new app.ThingTypeEditor({type: type}));
            this.mainView.render();
        },
        test: function() {
            this.mainView.setView(new app.TestView({}));
            this.mainView.render();
        }
	});
	return module;
});
