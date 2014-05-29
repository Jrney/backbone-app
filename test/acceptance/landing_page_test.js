'use strict';

casper.test.begin('Landing Page Tests', 1, function suite(test) {

    casper.start('http://localhost:3000/', function() {
        test.assertHttpStatus(200);
    });

    casper.run(function() {
        test.done();
    });
});
