define([
    'jquery',
    'backbone',
    'isotope',
    'pitstopsView',
    "app/routes/routes"
], function(
    $,
    Backbone,
    Isotope,
    PitstopView,
    PitstopRouter
) {
    //ISOTOPE
    var iso = new Isotope ("#container", {
        itemSelector: '.item',
        layoutMode: 'masonry',
        masonry: {
            columnWidth: 25
        }
    });
    $(function() {
        var router = new PitstopRouter();
        router.start();
    });
});