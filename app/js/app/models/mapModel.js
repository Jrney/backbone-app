define(["backbone"], function(Backbone) {
    var MapModel = Backbone.Model.extend({
        default: {
            center: new google.maps.LatLng(37.09024, -95.712891),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            zoom: 4
        }
    });
    return MapModel;
});