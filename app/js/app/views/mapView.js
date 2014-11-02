define([
    "backbone",
    "jquery",
    "hbs!app/templates/map",
    "app/models/requestModel"
    // "routeBoxer"
    //"app/models/mapModel"
], function(
    Backbone,
    $,
    mapTmpl,
    RequestModel
    // RouteBoxer
    //MapModel
) {

    var MapView = Backbone.View.extend({
        el: "#viewWrapper",
        template: mapTmpl,

        initialize: function() {
            // var test = new RouteBoxer();
            this.$el.html(this.template());
            //this.model = this.model || new RequestModel();
            this.model.on("change", this.render, this);
            this.render();
            return this;
        }, // end initialize

        events: {
            "click #embarkDirection": "getNewRoute"
        }, // end events

        getNewRoute: function() {
            window.console.log("I've been fired by the click function");
            this.model.set({
                origin: $("#startInput").val(),
                destination: $("#endInput").val(),
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            });

            //this.model.set("destination", $("#endInput").val());

            return this;
        }, // end getNewRoute

        route: function(myMap) {
            var that = this;
            var directionService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: myMap
            });

            window.console.log(this.model.toJSON());
            directionService.route(this.model.toJSON(), function(result, status) {

                if (status === google.maps.DirectionsStatus.OK) {
                    directionsRenderer.setDirections(result);

                    var path = result.routes[0].overview_path;
                    window.console.log('path: ' + path);

                    var boxes = that.boxRoute(path);
                    console.log('boxes.length' + boxes.length);
                    var boxpolys = new Array(boxes.length);
                    window.console.log("about to drop boxes");
                    that.drawBoxes(myMap, boxes, boxpolys);
                    // get places from boxes 
                    window.console.log("about to get places");
                    that.getPlaces(myMap, boxes);

                }
            });


        }, // end route

        boxRoute: function(path) {
            window.console.log("i'm in boxRoute");
            var routeBoxer = new RouteBoxer();
            var boxes = routeBoxer.box(path, 1);
            return boxes;

        }, // end box route
        drawBoxes: function(myMap, boxes, boxpolys) {
            window.console.log("i'm in drawBoxes");
            for (var i = 0; i < boxes.length; i++) {
                console.log('Building box ' + i + ' from bounds');
                boxpolys[i] = new google.maps.Rectangle({
                    bounds: boxes[i],
                    fillOpacity: 0,
                    strokeOpacity: 1.0,
                    strokeColor: "#000000",
                    strokeWeight: 1,
                    // give an id to your boxpolys
                    id: i,
                    map: myMap
                });
            }

        }, //get places from boxes areas
        getPlaces: function(myMap, boxes){

            window.console.log("i'm in getPlaces");
            var service = new google.maps.places.PlacesService(myMap);
            for(var i = 0; i < boxes.length; i++){      
                var request = {
                    bounds: boxes[i],
                    radius: '5',
                    types: ['store']
                };

                service.nearbySearch(request, callback);
            }

            function callback(results,status){
                if( status == google.maps.places.PlacesServiceStatus.OK){
                    //for (var i = 0; i < results.length; i++){
/*                     var placeNames = [];
                       var placeMarkers = [];
                       var placeInfoWindows = [];
                       */
                       for( var i = 0; i < 2 ; i++){
                        var place = results[i];

/*                        console.log('place ' + i + ' id: ' + place.id);
                          console.log('place ' + i + ' name: ' + place.name);
                          console.log('place ' + i + ' geometry.location: '+ place.geometry.location);  */

                            /* Place Object properties:
                            * geometry (props: location) , icon, id, name, place_id,
                            * reference,scopoe,types,vicinity,
                            * html_attributions
                            */
/*                        placeNames.push(place.name);*/

                        var marker = new google.maps.Marker({
                            position: place.geometry.location,
                            title: place.name,
                            animation: google.maps.Animation.DROP,

                         });
/*
                        placeMarkers.push(marker);*/

                        var infowindow = new google.maps.InfoWindow({
                        content: place.name
                            });
                        marker.setMap(myMap);

                /* the below code is overwriting the event listener at each point in the loop 
                * fix it!
                */
                        google.maps.event.addListener(marker, 'click', function(){
                             infowindow.open(myMap, marker);
                        });
                        
                    }
                }
            }

        },

        /*        clearBoxes: function(boxpolys) {
            if (boxpolys != null) {
                for (var i = 0; i < boxpolys.length; i++) {
                    boxpolys[i].setMap(null);
                }
            }
            boxpolys = null;
        },*/
        render: function() {
            //this.remove();
            var options = {
                center: new google.maps.LatLng(47.620467, -122.349116),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 16,
                scrollwheel: false
            };

            var myMap = new google.maps.Map($("#map_canvas")[0], options);
            if (this.model.get("origin") && this.model.get("destination")) {
                this.route(myMap);
            }

            return myMap;
        }
    });
    return MapView;
});