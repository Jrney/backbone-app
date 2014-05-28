define([
    'jquery',
    'backbone',
    'isotope',
    'pitstopView',
    "app/routes/routes"
], function(
    $,
    Backbone,
    Isotope,
    PitstopView,
    PitstopRouter
) {
    //ISOTOPE
    // var iso = new Isotope ("#container", {
    //     itemSelector: '.item',
    //     layoutMode: 'masonry',
    //     masonry: {
    //         columnWidth: 25
    //     }
    // });
    $(function() {
        console.log("samwise likes app.js");
        var router = new PitstopRouter();
        router.start();
    });
});