define([
    "backbone",
    "hbs!app/templates/pitstops",
    "app/collections/pitstopCollection"
], function (
    Backbone,
    pitstopTmpl,
    PitstopCollection
) {
    //Hard-coded google JSON response to work with;
    //will hook up to placesSearch(in seperate app) and dynamically fill in later.


    var PitstopView = Backbone.View.extend({
        el: "#container",
        template: pitstopTmpl,
        initialize: function () {

        },
        render: function () {
           this.$el.html(this.template(this.model.toJSON()));
           return this;
        }
    });
    return PitstopView;
});