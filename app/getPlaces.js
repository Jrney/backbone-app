//  make the following function with bounds object

function getZoom() {
    myZoom = map.zoom;
    return myZoom;
}

function getPlacesFromBounds(bounds) {

    PRC += 1;
    console.log('LOUD NOTE!!!!!!' + PRC);
    service = new google.maps.places.PlacesService(map);
    var googleBounds = [];
    googleBounds = bounds;
    console.log('googleBounds: ' + googleBounds);
    //make a variable that stores where we are in the places request
    //(googleBounds.length)-(googleBounds.length-10)
    //var first10 = (googleBounds.length) - (googleBounds.length - 10);
    //console.log('FIRST 10' + first10);
    //for (i=currentIndex-10;i<currentIndex;i+=1)


    if (googleBounds.length > 10) {
        var currentIndex = PRC * 10;
        console.log('currentIndex: ' + currentIndex);
        console.log('polys modulus' + googleBounds.length % 10);
        if (googleBounds.length < currentIndex - (googleBounds.length + 1 % 10)) {

            PRC = 1;
            currentIndex = PRC * 10;
        }

        for (i = currentIndex - 10; i < currentIndex; i += 1) {
            var myBounds = [];
            console.log('googleBounds ' + i + ' ' + googleBounds[i]);
            myBounds = googleBounds[i];

            //myCoords = new google.maps.LatLng(38.64592, -105.47095);

            console.log(myBounds);

            //The map is saying that googleBounds[i] is "not a
            //LatLng or LatLngLiteral". can it take
            //a bounds object as input?

            var request = {
                bounds: myBounds,
                types: ['food']
            };
            //service.radarSearch(request, callback);
            //service.nearbySearch(request, callback);
            if (map.zoom > 5) {
                service.nearbySearch(request, nearbyCallback);
            } else {
                service.radarSearch(request, radarCallback);
                console.log('radarSearch in progress');
            }

        }

    } else {
        for (i = 0; i < googleBounds.length; i += 1) {
            var myBounds = [];
            console.log('googleBounds ' + i + ' ' + googleBounds[i]);
            myBounds = googleBounds[i];

            //myCoords = new google.maps.LatLng(38.64592, -105.47095);

            console.log(myBounds);

            //The map is saying that googleBounds[i] is "not a
            //LatLng or LatLngLiteral". can it take
            //a bounds object as input?

            var request = {
                bounds: myBounds,
                types: ['food']
            };
            //service.radarSearch(request, callback);
            //service.nearbySearch(request, callback);
            if (map.zoom > 5) {
                service.nearbySearch(request, nearbyCallback);
                console.log('Nearby Search Fired');
            } else {
                service.radarSearch(request, radarCallback);
                console.log('radarSearch in progress');
                console.log('Radar Search Fired');
            }

        }


    }

}

function nearbyCallback(results, status) {
    //console.log('callback called');
    //console.log(results + status);
    //getting a "ZERO_RESULTS" return from googles.

    for (var i = 0; i < results.length; i++) {
        // console.log(results.toJSON());
        //console.log('callback results ' + [i] + results[i]);
        //console.log('about to log results details ' + countOfPlaces);
        console.log('name: ' + results[i].name);
        //console.log('id: ' +results[i].id);
        console.log('types: ' + results[i].types);
        console.log('rating: ' + results[i].rating);
        console.log('vicinity: ' + results[i].vicinity);
        //console.log(results[i].URL);
        //console.log(results[i].website);
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //request places every second
            //console.log('maps.places');
            var limit = results.length;
            for (var i = 0; i < limit; i += 1) {
                var info = {};
                info.name = results[i].name;
                info.vicinity = results[i].vicinity;
                info.rating = results[i].rating || "No Rating";
                info.types = results[i].types;
                var marker = createMarkerNearby(results[i], info);
            }
        } else {
            console.log('google.maps.places.PlacesServiceStatus Not Ok');
        }

    }
    //return placesCount;
}

function radarCallback(results, status) {
    //console.log('callback called');
    //console.log(results + status);
    //getting a "ZERO_RESULTS" return from googles.
    console.log(results[0]);
    for (var i = 0; i < results.length; i++) {

        if (status == google.maps.places.PlacesServiceStatus.OK) {
            //request places every second
            //console.log('maps.places');
            //var limit = 20;
            for (var i = 0; i < results.length; i += 1) {
                createMarkerRadar(results[i]);

            }
        } else {
            console.log('google.maps.places.PlacesServiceStatus Not Ok');
        }

    }
    //return placesCount;
}

function createMarkerRadar(place) {
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location
    });


} //createMarker
function createMarkerNearby(place, info) {
    var infowindow = new google.maps.InfoWindow({
        content: info.name + "</br>" + info.vicinity + "</br>" + info.rating + "</br>" + info.types

    });
    var placeLoc = place.geometry.location;
    var marker = new google.maps.Marker({
        map: map,
        animation: google.maps.Animation.DROP,
        position: place.geometry.location

    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map, marker);
    });

} //createMarker
