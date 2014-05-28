define(["backbone"], function(Backbone) {
    var IndexModel = Backbone.Model.extend({
        defaults: {
            start: "",
            end: "",
        }
    });
    return IndexModel;
});