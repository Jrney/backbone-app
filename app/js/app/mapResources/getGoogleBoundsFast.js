//depedencies:
// google maps api
// map.js
function getBounds() {
    //make an array to store the bounds
    var googleBounds = [];

    for (i = 0; i < boxpolys.length; i += 1) {

        //assign each bounds coordinate to a variable
        //Ba.k is SWlat, ra.j is SWlon, Ba.j is NElat, ra.k is NElon
        mySwBoundsLat = boxpolys[i].bounds.Ba.k;
        mySwBoundsLon = boxpolys[i].bounds.ra.j;
        myNeBoundsLat = boxpolys[i].bounds.Ba.j;
        myNeBoundsLon = boxpolys[i].bounds.ra.k;

        //make a new Google LatLng object for the sw and ne bounds corners
        var mySwGoogleLatLon = new google.maps.LatLng(mySwBoundsLat, mySwBoundsLon);
        var myNeGoogleLatLon = new google.maps.LatLng(myNeBoundsLat, myNeBoundsLon);

        //make a Google LatLng Bounds object from the Google LatLon Coords
        myGoogleBounds = new google.maps.LatLngBounds(
            mySwGoogleLatLon,
            myNeGoogleLatLon
        );
        //assign the i index of the googleBounds array to myGoogleBounds
        googleBounds[i] = myGoogleBounds;

        console.log('myGoogleBounds ran');
        console.log('myGoogleBounds:' + myGoogleBounds);
    }
    return googleBounds;
    console.log(googleBounds);
}
