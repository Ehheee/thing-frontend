define(["backbone", 
		"jquery",
		"app/config",
		"app/data/ThingServer", 
		"app/Router", 
		"app/applicationContainer", 
		"app/filters/ThingFilter",
		"app/views/common/ArrayView", 
		"app/views/common/JsonTreeContainer", 
		"app/views/common/JsObjectView", 
		"app/views/common/KeyValueInputView",
		"app/views/common/MainView",
		"app/views/common/menu/MainMenu",
		"app/views/common/menu/ContextMenu",
		"app/views/thing/ThingTypeEditor",
		"app/data/RecursiveModel",
		"socks",
		"stomp"
		],
function(Backbone, 
		 $, 
		 config,
		 ThingServer,
		 Router, 
		 app, 
		 ThingFilter,
		 ArrayView,
		 JsonTreeContainer, 
		 JsObjectView, 
		 KeyValueInputView,
		 MainView,
		 MainMenu,
		 ContextMenu,
		 ThingTypeEditor,
		 RecursiveModel,
		 SockJS,
		 Stomp
		 ) {
	var module = function() {
		//this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		console.log(JsonTreeContainer);
		app.JsonTreeContainer = JsonTreeContainer;
		app.JsObjectView = JsObjectView;
		app.ThingFilter = ThingFilter;
		app.RecursiveModel = RecursiveModel;
		app.KeyValueInputView = KeyValueInputView;
		app.ArrayView = ArrayView;
		app.MainView = MainView;
		app.MainMenu = MainMenu;
		app.ContextMenu = ContextMenu;
		app.ThingTypeEditor = ThingTypeEditor;
		console.log("running");
		appRootUrl = config["appRootUrl"];
		var router = new Router();
		Backbone.history.start({pushState: true, hashChange: false, root: appRootUrl});
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
