//dependencies
//getPlacesFromBounds

function requestLoop(currentIndex, test, googleBounds) {
    for (var i = currentIndex - 10; i < test; i += 1) {

        var myBounds = [];
        myBounds = googleBounds[i];
        //request data
        var request = {
            bounds: myBounds,
            types: ['food']
        }
        if (map.zoom > 5) {
            service.nearbySearch(request, nearbyCallback);
        } else {
            service.radarSearch(request, radarCallback);
            //  console.log('radarSearch in progress');
        }
    }

}