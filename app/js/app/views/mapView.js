define([
        "backbone",
        "jquery",
        "hbs!app/templates/map",
        "app/models/requestModel"
        //"app/models/mapModel"
], function(
        Backbone,
        $,
        mapTmpl,
        RequestModel
        //MapModel
) {

    var MapView = Backbone.View.extend({
        el: "#viewWrapper",
        template: mapTmpl,

        initialize: function() {

            var options =
                {
                    center: new google.maps.LatLng(47.620467 , -122.349116),
                    mapTypeId:google.maps.MapTypeId.ROADMAP,
                    zoom: 16
                };

            this.$el.html(this.template());

            var myMap = new google.maps.Map($("#map_canvas")[0], options);

            //window.console.log(this.model.origin);
            this.route(myMap);
            return myMap;

        },// end initialize
        route: function(myMap) {
            console.dir(myMap);
            var directionService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: myMap
            });
            //var routeBoxer = new RouteBoxer();
            // Clear any previous route boxes from the map
            //need clear boxes function as dependency
            //clearBoxes();

            // Convert the distance to box around the route from miles to km
            //var distance = parseFloat(document.getElementById("distance").value) * 1.609344;

            var request = {
                origin: this.model.origin,
                destination: this.model.destination,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            };

            // Make the directions request
            directionService.route(request, function(result, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);
                    //This is the blue line (path) of the route
                    var path = result.routes[0].overview_path;

                    // Box around the overview path(declared above) of the first route
                    //var boxes = routeBoxer.box(path, distance);


                    // Call function elsewhere drawBoxes(boxes);
                } else {
                    alert("Directions query failed: " + status);
                }
            });
            //return boxes;
        },// end route
        render: function() {

        }
    });
    return MapView;
});