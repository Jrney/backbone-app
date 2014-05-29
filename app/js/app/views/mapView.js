define([
        "backbone",
        "jquery",
        "hbs!app/templates/map"
        //"app/models/mapModel"
], function(
        Backbone,
        $,
        mapTmpl
        //MapModel
) {

    var MapView = Backbone.View.extend({
        el: "#viewWrapper",
        template: mapTmpl,

        initialize: function() {

            window.console.log("inside of initialize");

            var options =
                {
                    center: new google.maps.LatLng(47.620467 , -122.349116),
                    mapTypeId:google.maps.MapTypeId.ROADMAP,
                    zoom: 16
                };

            this.$el.html(this.template());

            var myMap = new google.maps.Map($("#map_canvas")[0], options);

            return myMap;

        },
        render: function() {

        }
    });
    return MapView;
});