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
            this.request = new RequestModel();
            var that = this;
            $("#embarkDirection").on("click", function(e) {
                e.preventDefault();

                window.console.log(that.request);
                that.request.origin = $("#startInput").val();
                that.request.destination = $("#endInput").val();

                window.console.log(that.request.origin);
                // backbone.naviage trigger = true;
                // backbone events vs click events;
                window.console.log(Router);
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