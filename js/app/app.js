define(["backbone", "jquery", "app/config", "app/data/ThingServer", "app/Router", "app/applicationContainer", "app/filters/ThingFilter", "app/views/common/TestView", "app/views/common/ArrayView", "app/views/common/JsonTreeContainer", "app/views/common/JsObjectView", "app/views/common/KeyValueInputView", "app/views/common/MainView", "app/views/common/menu/MainMenu", "app/views/common/menu/ContextMenu", "app/views/thing/ThingTypeEditor", "app/data/RecursiveModel", "socks", "stomp"], function(Backbone, $, config, ThingServer, Router, app, ThingFilter, TestView, ArrayView, JsonTreeContainer, JsObjectView, KeyValueInputView, MainView, MainMenu, ContextMenu, ThingTypeEditor, RecursiveModel, SockJS, Stomp) {
	var StateMapper = function(app) {
		this.states = [];
		this.currentSequence = [];
	};
	StateMapper.prototype.initiateApp = function(app) {
		_.each(app, this.checkAppKey.bind(this, app));
	};
	StateMapper.prototype.checkAppKey = function(app, value, key) {
		if (_.isFunction(value)) {
			this.replaceConstructor(app, key, value);
		} else if (_.isObject(value)) {
			_.each(value, this.checkObjectKey.bind(this, value, value, key, false));
		};
	};
	/*
	 * iga prototüübi funktsiooni kohta tuleb teha objektile funktsioon, mis käivitudes applyb prototype'i funktsiooni endaga
	 */
	StateMapper.prototype.replaceConstructor = function(app, key, constructor) {
		var context = this;
		//_.each(constructor.prototype, context.checkObjectKey.bind(this, constructor.prototype, key));
		var o;
		app[key] = this.createConstructor(constructor, key);
		/*
		app[key] = function() {
			o = Object.create(constructor.prototype);
			_.each(o.constructor.prototype, context.checkObjectKey.bind(context, o, o.constructor.prototype, key, true));
			constructor.apply(o, arguments);
			return o;
		};
		*/
	};
	StateMapper.prototype.createConstructor = function(base, key) {
		var context = this;
		var sub = function() {
			_.each(base.prototype, context.checkObjectKey.bind(context, this, this.constructor.prototype, key, true));
			base.prototype.constructor.apply(this, arguments);
			
		};
		sub.prototype = Object.create(base.prototype);
		sub.prototype.constructor = sub;
		sub.realType = base.prototype;
		return sub;
	};
	StateMapper.prototype.checkObjectKey = function(bindObject, appObject, appKey, isPrototype, appSubObject, subKey) {
		if (_.isFunction(appSubObject) && subKey !== "constructor") {
			this.initiateFunction(bindObject, appObject, appKey, appSubObject, subKey, isPrototype);
		} else if (_.isFunction(appSubObject) && subKey === "constructor") {
			//bindObject[subKey] = this.newFunc(bindObject, appObject, appKey, appSubObject, subKey).bind(bindObject);
		}
	};
	StateMapper.prototype.initiateFunction = function(bindObject, appObject, appKey, func, key, isPrototype) {
		var oldFunc = func;
		if (isPrototype) {
			bindObject[key] = 	this.newFunc(bindObject, appObject, appKey, oldFunc, key);
		} else {
			appObject[key] = this.newFunc(bindObject, appObject, appKey, oldFunc, key);
		}
		
	};
	StateMapper.prototype.newFunc = function(bindObject, appObject, appKey, oldFunc, key) {
		var compositeKey = appKey + "." + key;
		var context = this;
		return function() {
			context.currentSequence.push(compositeKey);
			if (context.currentSequence.length === 1) {
				context.stateMap = {};
				context.stateMap[compositeKey] = {};
			} else {
				app.jsonUtils.setField(context.stateMap, context.currentSequence, {});
			}
			context.currentState = context.stateMap[compositeKey];
			var toReturn = oldFunc.apply(bindObject, arguments);
			context.currentSequence.splice(context.currentSequence.indexOf(compositeKey), 1);
			if (context.currentSequence.length === 0) {
				context.states.push(context.stateMap);
				console.log(context.states);
			}
			return toReturn;
		};
	};
	
	StateMapper.prototype.newState = function() {
		
	};
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
		app.TestView = TestView;
		console.log("running");
		appRootUrl = config["appRootUrl"];
		this.router = new Router();
		app.router = this.router;
		stateMapper = new StateMapper();
		stateMapper.initiateApp(app);
		Backbone.history.start({
			pushState : true,
			hashChange : false,
			root : appRootUrl
		});
		
	};
	_.extend(module.prototype, Backbone.Events);
	return new module();
});
