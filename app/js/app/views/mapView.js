define([
        "backbone",
        "hbs!app/templates/map",
        "app/models/mapModel"
], function(
        Backbone,
        mapTmpl,
        MapModel
) {

    var MapView = Backbone.View.extend({
        el: "#viewWrapper",
        template: mapTmpl,


        initialize: function() {
            console.log('inside of initMap');
            var options = [{center: new google.maps.LatLng(37.09024, -95.712891), mapTypeId:google.maps.MapTypeId.ROADMAP, zoom: 4 }];

            var myMap = new google.maps.Map($('#map_canvas'), options);
            console.log("was the map returned?");
            this.render();
        },
        render: function() {
            console.log("inside of the render funtion in mapsView");

            this.$el.html(this.template(this.model.toJSON()));

            return this;
        }
    });
    return MapView;
});