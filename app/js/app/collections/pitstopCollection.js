define([
        "backbone",
        "app/models/pitstopModel"
], function(
    Backbone,
    PitstopModel
){
    var PitstopCollection = Backbone.Collection.extend({
        model: PitstopModel
    });
    return PitstopCollection;
});