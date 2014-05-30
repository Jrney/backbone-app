define([
    "backbone",
    "jquery"
], function(
    Backbone,
    $
) {
    var RequestModel = Backbone.Model.extend({
        defaults: {
            origin: "",
            destination: "",
            travelMode: google.maps.DirectionsTravelMode.DRIVING
        }
    });
    return RequestModel;
});