define(["backbone", "app/views/common/MainView"], function(Backbone, MainView) {
	var module = Backbone.Router.extend({
	    routes: {
	        "thingtype/create/": "showThingTypeCreate"
	    },
		initialize: function() {
            Backbone.on("router:navigate", this.navigate, this);
            this.mainView = new MainView();
            this.mainView.render();
        },
        showThingTypeCreate: function() {
            console.log("here here");
        }
	});
	return module;
});
