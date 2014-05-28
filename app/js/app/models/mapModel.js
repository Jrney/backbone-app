define(['backbone'], function(Backbone) {
    var mapModel = Backbone.Model.extend({
        default: {
            center: {},
            position: {},
            currentLatLng: {},
            mapTypeId: {},
            zoom: 4,
            mapOptions: {},
            route: '',
        },
        initMap: function(center) {
            this.set('center', center);
            var currentLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            this.set('currentLatLng', currentLatLng);
            var mapOptions = {
                zoom: this.get('zoom'),
                center: currentLatLng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            this.set('mapOptions', mapOptions);
        }
    });
    return mapModel;
});