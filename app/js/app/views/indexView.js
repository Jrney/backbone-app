define([
    "backbone",
    "hbs!app/templates/index"
], function(
    Backbone,
    indexTmpl
) {
    var IndexView = Backbone.View.extend({
        el: "#viewWrapper",
        template: indexTmpl,
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
    return IndexView;
});