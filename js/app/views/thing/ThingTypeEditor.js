define(["backbone", "app/applicationContainer"], function(Backbone, app) {
    var thingType = {
        name: "input",
        displayName: "input",
        relationsOutgoing: {}
    };
    var fieldDescriptor = {
        name: "input",
        displayName: "input",
        type: [],
        required: "checkbox",
    };
    var module = Backbone.View.extend({
        initialize: function(options) {
            _.extend(this, options);
            this.checkType();
        },
        checkType: function() {
            if (this.type) {
                this.requestType();
            } else {
                this.newType();
            }
        },
        requestType: function() {
            this.listenToOnce(Backbone, "thingType", this.onData);
            Backbone.trigger("request:data", {responseChannel: "thingType", path: "/thing/json/get", data: {labels: [this.type], properties: {}, responseFormat: "thing"}});
            this.resetJsonView();
        },
        newType: function() {
            this.resetJsonView();
            setTimeout(this.onData.bind(this, {}), 300);
            //this.onData({});
        },
        resetJsonView: function() {
            if (this.jsonView) {
                this.jsonView.remove();
            }
            this.jsonView = new app.JsonTreeContainer({});
        },
        render: function() {
            this.$el.html(this.jsonView.render().$el);
        },
        addField: function() {
            var f = new app.RecursiveModel(fieldDescriptor);
        },
        onData: function(data) {
            this.jsonView.onNewData(new app.RecursiveModel(data));
        }
    });
    return module;
});
