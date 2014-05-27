define(['jquery'], function() {

/**
 * @description loading the google maps api
 *  - use with the div id '#map_canvas'
 */
var mohi = new google.maps.LatLng(47.627721, -122.336715);

var foods = [
  new google.maps.LatLng(47.626694, -122.334904),
  new google.maps.LatLng(47.627800, -122.333817),
  new google.maps.LatLng(47.625575, -122.340132)
]

var markers = [];
var iterator = 0;

var map;

function initialize() {
  var mapOptions = {
    zoom: 16,
    center: mohi,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

}

function drop() {
  for (var i = 0; i < foods.length; i++) {
    setTimeout(function() {
      addMarker();
    }, i * 200);
  }
}

function addMarker() {
  markers.push(new google.maps.Marker({
    position: foods[iterator],
    map: map,
    draggable: false,
    animation: google.maps.Animation.DROP
  }));
  iterator++;
}

//google.maps.event.addDomListener(window, 'load', initialize);
initialize();
// function loadScript() {
//   var script = document.createElement("script");
//   script.type = "text/javascript";
//   script.src = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize";
//   document.body.appendChild(script);
// }


});// end require.js define