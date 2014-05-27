var $ = require('jquery');
var Backbone = require('backbone');
var _ = require('underscore');
Backbone.$ = $;

var MapView = require('views/mapsView');

$(function() {
    console.log("samwise in mapView");
    var mapView = new MapView();

    $('#mapView').append(mapView.$el);
});