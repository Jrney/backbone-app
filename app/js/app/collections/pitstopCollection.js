define([
        "backbone",
        "../models/pitstopModel.js"
], function(
    Backbone,
    PitstopModel
){
    var PitstopCollection = Backbone.Collection.extend({
        model: PitstopModel
    });
    return PitstopCollection;
});