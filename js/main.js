requirejs.config({
    baseUrl: "js/",
    paths: {
		lib: "lib",
        app: "app"
    },
	shim: {
		"jquery.datetimepicker": ["jquery"]
	}
});
requirejs(["backbone", "app/templateLoader"], function(Backbone, templateLoader) {
	Backbone.on("templates:loaded", function() {
		requirejs(["app/app"], function(app) {
			app.run();
		});
	});
});