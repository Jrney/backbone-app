define(["backbone"], function(Backbone) {
    var PitstopModel = Backbone.Model.extend({
        defaults: {
            id: "",
            name: "",
            address: "",
            rating: "",
        }
    });
    return PitstopModel;
});