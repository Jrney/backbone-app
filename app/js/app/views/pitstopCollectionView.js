define([
    "backbone",
    "hbs!app/templates/pitstops",
    "pitstopsView"
], function(
    Backbone,
    pitstopsTmpl,
    PitstopsView
) {
    var PitstopCollectionView = Backbone.View.extend({
        template: pitstopTmpl,
        initialize: function() {
            this.render();
        },
        render: function() {
            this.$el.html(this.template());
            var $items = this.$("#pitstopsContainer");
            this.collection.each(function(model) {
                var pitstopView = new PitstopsView({
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