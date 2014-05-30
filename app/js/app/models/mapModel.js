define(['backbone', 'async!http://maps.googleapis.com/maps/api/js?v=3.exp?key={AIzaSyAckmSzoxdbOdFhNltb9ufCWuTackzcupc}&sensor=false&libraries=places'], function(Backbone) {
    var MapModel = Backbone.Model.extend({
        defaults: {}
    });
    return MapModel;
});
