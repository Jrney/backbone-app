require([
        "backbone",
        "jquery",
        "underscore",
        "async!http://maps.google.com/maps/api/js?sensor=false"
        //"async!http://maps.googleapis.com/maps/api/js?v=3.exp?key={AIzaSyAckmSzoxdbOdFhNltb9ufCWuTackzcupc}&sensor=false&libraries=places"
], function(
        Backbone,
        $,
        _
) {

    var MapView = Backbone.View.extend({
        _map: null,

        render: function(){

            this.$el.css({width:600, height:400});
            this.map = new google.maps.Map(this.el,{
                zoom:16,
                center: new google.maps.LatLng(43.81451767218152, -91.25057458877563),
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });
          return this;
        }
    });
    return MapView;
});

