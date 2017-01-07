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
            this.listenToOnce(Backbone, "thingType", this.onData);
            Backbone.trigger("request:data", {responseChannel: "thingType", path: "/thing/json/get", data: {labels: [this.type], properties: {}, responseFormat: "thing"}});
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
