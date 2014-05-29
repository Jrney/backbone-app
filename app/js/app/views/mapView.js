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

            this.$el.html(this.template());
            //this.model = this.model || new RequestModel();
            this.model.on("change", this.render, this);
            //this.model = new RequestModel({});
            // set a listener to the model
            // this.model.on('change', this.render);
            // in render clear this.$el or clear the map.

            //var that = this;
            // specify the element for the target of the click event.
            // events: {
            //   "click": "getNewRoute"},
            //  getNewRoute: fucntion() {
            //      this.model.origin.......
            //  }
            // $("#embarkDirection").on("click", function(e) {
            //     e.preventDefault();

            //     that.model.origin = $("#startInput").val();
            //     that.model.destination = $("#endInput").val();

            //     window.console.log(that.request);
            // });
            this.render();
            return this;
        },// end initialize

        events: {
            "click #embarkDirection" : "getNewRoute"
        },// end events

        getNewRoute: function() {
            window.console.log("I've been fired by the click function");
            this.model.set ({
                origin : $("#startInput").val(),
                destination : $("#endInput").val()
            });

            //this.model.set("destination", $("#endInput").val());

            return this;
        },// end getNewRoute

        route: function(myMap) {
            var directionService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: myMap
            });
            //var routeBoxer = new RouteBoxer();
            // Clear any previous route boxes from the map
            //need clear boxes function as dependency
            //clearBoxes();

            // Convert the distance to box around the route from miles to km
            // var distance = parseFloat(document.getElementById("distance").value) * 1.609344;
            // var that = this;
            // var directions = {
            //     origin: that.model.origin,
            //     destination: that.model.destination,
            //     travelMode: google.maps.DirectionsTravelMode.DRIVING
            // });
            // window.console.dir();
            // window.console.dir(that.model.toJSON());

            // Make the directions request
            directionService.route(this.model.toJSON(), function(result, status) {
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
            //this.remove();
            var options =
                {
                    center: new google.maps.LatLng(47.620467 , -122.349116),
                    mapTypeId:google.maps.MapTypeId.ROADMAP,
                    zoom: 16
                };

            var myMap = new google.maps.Map($("#map_canvas")[0], options);

            //window.console.log(this.model.origin);
            if(this.model.origin && this.model.destination) {
                this.route(myMap);
            }

            return myMap;
        }
    });
    return MapView;
});