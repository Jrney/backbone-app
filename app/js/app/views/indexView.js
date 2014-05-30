define([
    "backbone",
    "hbs!app/templates/index",
    "jquery",
    "app/models/requestModel",
    "app/routes/routes"
], function(
    Backbone,
    indexTmpl,
    $,
    RequestModel,
    Router
) {
    var IndexView = Backbone.View.extend({
        el: "#viewWrapper",
        template: indexTmpl,
        initialize: function() {
            this.render();
            var that = this;

            $("#embarkDirection").on("click", function(e) {
                e.preventDefault();

                that.model.set({
                    origin : $("#startInput").val(),
                    destination : $("#endInput").val()
                });

                Backbone.history.navigate("map", {trigger: true});
            });

        },
        render: function() {
            this.$el.html(this.template());
            return this;
        }
    });
    return IndexView;
});