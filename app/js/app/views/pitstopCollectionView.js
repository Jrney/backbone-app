define([
    "backbone",
    "hbs!app/templates/pitstops",
    "pitstopView"
], function(
    Backbone,
    pitstopsTmpl,
    PitstopView
) {
    var PitstopCollectionView = Backbone.View.extend({
        el: "#viewWrapper",
        template: pitstopsTmpl,
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
            var $items = this.$("#pitstopsContainer");
            this.collection.each(function (model) {
                var pitstopView = new PitstopView({
                    model: model,
                    render: function() {
                        this.$el.html(this.template(this.model.toJSON()));
                        return this;
                    },
                });
                pitstopView.render();
                $items.append(pitstopView.$el);
            });
            return this;
        }
    });
    return PitstopCollectionView;
});