define(["backbone", 
		"jquery", 
		"app/router", 
		"app/applicationContainer", 
		"app/filters/ThingFilter",
		"app/views/common/ArrayView", 
		"app/views/common/JsonTreeContainer", 
		"app/views/common/JsObjectView", 
		"app/views/common/KeyValueInputView", 
		"app/data/RecursiveModel",
		"socks",
		"stomp"
		],
function(Backbone, 
		 $, 
		 router, 
		 app, 
		 ThingFilter,
		 ArrayView,
		 JsonTreeContainer, 
		 JsObjectView, 
		 KeyValueInputView, 
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
		console.log("running");
		var filter = new app.ThingFilter();
		var data = [{abc: "avc", acd: {aml: "sdfsd", ooo: {aaaa: "bbbb"}}},
		            {oiuoiu: "lkj", hgjgh: {uytu: "nvbnv", hgfh: {ytryrt: "gdf"}}}
		];
		
		var arrayView = new ArrayView({filter: filter, SubView: app.JsonTreeContainer});
		filter.onResult(data);
		$("body").append(arrayView.$el);
		var sock = new SockJS("http://127.0.0.1/thingone/ws");
		var stompClient = window.Stomp.over(sock);
		stompClient.connect({"path": "app"}, function(frame) {
		    stompClient.send("/aa");
		    
		}, function() {
		    console.log("bb", arguments);
		});
		setTimeout(function() {stompClient.send("/app/aa");}, 5000);
		
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
