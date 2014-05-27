define([
        "backbone",
        "hbs!app/templates/map.hbs"
    ], function(
        Backbone,
        mapTmpl
    ) {

    var MapView = Backbone.View.extend({
        el: "#mapView",
        template: mapTmpl,

        initialize: function() {
            this.render();
        },

        render: function() {
            this.$el.html(this.template(this.toJSON()));
            return this;
        }
    )};
    return MapView;
});