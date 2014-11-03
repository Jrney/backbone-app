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
            "click #embarkDirection": function(){
                this.getNewRoute();
            },
            "click #storesButton" : function(){
                this.render('store');
            },            
            "click #foodButton" : function(){
                this.render('food');
            },
            "click #clothesButton" : function(){
                this.render('clothing_store');
            },            
            "click #gasButton" : function(){
                this.render('gas_station');
            }            
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

        route: function(myMap, type) {
            var that = this;
            var directionService = new google.maps.DirectionsService();
            var directionsRenderer = new google.maps.DirectionsRenderer({
                map: myMap
            });
            console.log('type: '+ type);
            var searchType;
            if(type != null){
                 searchType = type;
            } else {
                 searchType = 'taco';
            }
            //searchType = 'food';

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
                    that.getPlaces(myMap, boxes, searchType);

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
               // console.log('Building box ' + i + ' from bounds');
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
        getPlaces: function(myMap, boxes, type){
            var that = this;
            window.console.log("i'm in getPlaces");
            var service = new google.maps.places.PlacesService(myMap);
            var searchType;
            if(type != null){
                 searchType = type;
            } else {
                 searchType = 'food';
            }
            //searchType = 'food';
            for(var i = 0; i < boxes.length; i++){  
            console.log('searchType: '+ searchType);  
                var request = {
                    bounds: boxes[i],
                    radius: '5',
                    types: [searchType]
                };

                service.nearbySearch(request, callback);
            }

            function callback(results,status){
                if( status == google.maps.places.PlacesServiceStatus.OK){
                    //for (var i = 0; i < results.length; i++){
                       var placeNames = [];
                       var placeMarkers = [];
                      // var placeInfoWindows = [];
                       
                       for( var j = 0; j < results.length ; ++j){
                        var place = results[j];

/*                        console.log('place ' + i + ' id: ' + place.id);
                          console.log('place ' + i + ' name: ' + place.name);
                          console.log('place ' + i + ' geometry.location: '+ place.geometry.location);  */

                            /* Place Object properties:
                            * geometry (props: location) , icon, id, name, place_id,
                            * reference,scopoe,types,vicinity,
                            * html_attributions
                            */
                        placeNames.push(place.name);

                        var marker = new google.maps.Marker({
                            position: place.geometry.location,
                            title: place.name,
                            animation: google.maps.Animation.DROP

                         });
                        placeMarkers.push(marker);
                        //console.log('placeMarkers ' + j + ': ' + Object.getOwnPropertyNames(placeMarkers[j]));
                        /*  
                        *   placeMarkers props: gm_accessors_,position,
                        *   gm_bindings_,title,animation,clickable,
                        *   visible
                        */
                        marker.setMap(myMap);
                    }

                    /* On click, make an info window with the name of the location
                    */
                    for(var k = 0; k < results.length; k += 1 ){
                        google.maps.event.addListener(placeMarkers[k], 'click', function(){
                            console.dir(this);
                            var infowindow = new google.maps.InfoWindow({
                              content: this.title
                            });
                            that.showInfo(this, infowindow, myMap);
                        });                  
                    }
                
            }

        }
    },
        showInfo: function(marker, infowindow, map){
                             infowindow.open(map, marker);

        },
        /*        clearBoxes: function(boxpolys) {
            if (boxpolys != null) {
                for (var i = 0; i < boxpolys.length; i++) {
                    boxpolys[i].setMap(null);
                }
            }
            boxpolys = null;
        },*/
        render: function(type) {
            //this.remove();
            if(!myMap){
                var options = {
                    //center: new google.maps.LatLng(47.620467, -122.349116),
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    zoom: 16,
                    scrollwheel: false
                };
                var myMap = new google.maps.Map($("#map_canvas")[0], options);
            }

            if(type != null){
                 searchType = type;
            } else {
                 searchType = 'store';
            }

            if (this.model.get("origin") && this.model.get("destination")) {
                this.route(myMap,searchType);
            }

            return myMap;
        }
    });
    return MapView;
});