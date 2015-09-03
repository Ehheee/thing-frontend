define(["backbone", "jquery", "app/config",  "app/views/common/LoginView", "app/serverdata/cache", "app/routers/Router", "app/serverdata/dataProvider"], function(Backbone, $, config, LoginView, cache, Router, dataProvider) {
	var module = function() {
		this.dataProvider = dataProvider;
	};
	module.prototype.run = function() {
		Backbone.trigger("request:data", {method: "hello"}, "response:hello");
		Backbone.once("response:hello", function(response) {
			if (response["error"] && response["error"]["magicErrorCode"] === "SessionNotAuthenticated") {
				this.showLogin();
			} else {
				this.afterLogin();
			}
		}, this);
	};
	module.prototype.showLogin = function() {
		this.loginView = new LoginView();
		this.loginView.render();
		this.loginView.once("login:success", this.afterLogin, this);
	};
	module.prototype.afterLogin = function() {
		if (this.loginView) {
			this.loginView.remove();
		}
		this.heartBeatInterval = setInterval(this.sendHeartBeat, 15000);
		Backbone.on("heartBeat", this.handleHeartBeat, this);
		this.listenToOnce(cache, "initialized", this.afterCache);
		cache.initialize();
	};
	module.prototype.afterCache = function() {
		appRootUrl = config["app.root"];
		this.router = new Router();
		this.listenTo(this.router, "route:logout", this.onLogOut);
		Backbone.history.start({pushState: true, hashChange: false, root: appRootUrl});
	};
	module.prototype.sendHeartBeat = function() {
		Backbone.trigger("request:data", {method:"heartbeat", jsonrpc:"2.0"}, "heartBeat");
	};
	module.prototype.handleHeartBeat = function(response) {
		if (!response || response["error"]) {
			this.stopHeartBeat();
		}
	};
	module.prototype.stopHeartBeat = function() {
		if (this.heartBeatInterval > 0) {
			clearInterval(this.heartBeatInterval);
		}
		this.heartBeatInterval = 0;
	};
	module.prototype.onLogOut = function() {
		console.log("logout");
		Backbone.trigger("request:data", {method: "logout"}, "logout");
		Backbone.once("logout", this.afterLogout);
	};
	module.prototype.afterLogout = function() {
		Backbone.trigger("router:navigate", "/");
		window.location.reload();
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
