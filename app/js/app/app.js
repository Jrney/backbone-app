define([
    "jquery",
    "backbone",
    "isotope",
    "app/routes/routes"
], function(
    $,
    Backbone,
    Isotope,
    AppRouter
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
        window.console.log("samwise likes app.js");
        var router = new AppRouter();
        router.start();
    });
});