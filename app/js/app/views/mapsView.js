define([
        "backbone",
        "hbs!app/templates/map",
        "app/models/mapModel"
], function(
        Backbone,
        mapTmpl,
        mapModel
) {

    var MapView = Backbone.View.extend({
        el: "#map_canvas",
        template: mapTmpl,

        initialize: function() {
            var url = "http:maps.googleapis.com/maps/api/js?v=3.exp?key={AIzaSyAckmSzoxdbOdFhNltb9ufCWuTackzcupc}&sensor=false&libraries=places";
            $.ajax({
                url: url,
                dataType: "script",
                async: false,
                success: function() {
                    console.log("API script has been loaded");
                }
            });
            this.model.set('mapModel', new google.maps.Map(this.el, this.model.get('mapOptions')));
            this.render();
        },
        render: function() {
            console.log("inside of the render funtion in mapsView");
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        }
    });
    return MapView;
});