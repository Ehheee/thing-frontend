define(["backbone", "app/applicationContainer"], function(Backbone, app) {
    var klikk = 0;
    var module = Backbone.View.extend({
        events: {
            "click": "klikk"
        },
        initialize: function(data) {
            klikk = klikk +1;
            this.k = klikk ;
            if (this.k < 5 && this.k != 5) {
                this.childView = Object.create(this.constructor.prototype);
                this.constructor.apply(this.childView, {});
                this.childView.render();
            }
            return this;
        },
        className: "test",
        render: function() {
            if (this.childView) {
                this.$el.html(this.childView.el);
            }
            this.$el.append("aaa" + this.k);
            return this;
        },
        klikk: function(evt) {
            evt.stopPropagation();
            console.log("klikk" + this.k);
        }
    });
    return module;
});