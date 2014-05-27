define([
    "backbone",
    "../collections/pitstopCollection",
    "../models/pitstopModel",
    "../views/pitstopCollectionView"
], function(
    Backbone,
    PitstopCollection,
    PitstopModel,
    PitstopCollectionView
) {
    var fakeGoogleJson = {
       "html_attributions" : [
          "Listings by \u003ca href=\"http://www.yellowpages.com.au/\"\u003eYellow Pages\u003c/a\u003e"
       ],
       "results" : [
         {
             "formatted_address" : "529 Kent Street, Sydney NSW, Australia",
             "geometry" : {
                "location" : {
                   "lat" : -33.8750460,
                   "lng" : 151.2052720
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
             "id" : "827f1ac561d72ec25897df088199315f7cbbc8ed",
             "name" : "Tetsuya's",
             "rating" : 4.30,
             "reference" : "CnRmAAAAmmm3dlSVT3E7rIvwQ0lHBA4sayvxWEc4nZaXSSjRtfKRGoYnfr3d5AvQGk4e0u3oOErXsIJwtd3Wck1Onyw6pCzr8swW4E7dZ6wP4dV6AsXPvodwdVyqHgyGE_K8DqSp5McW_nFcci_-1jXb5Phv-RIQTzv5BjIGS0ufgTslfC6dqBoU7tw8NKUDHg28bPJlL0vGVWVgbTg",
             "types" : [ "restaurant", "food", "establishment" ]
          },
          {
             "formatted_address" : "Upper Level, Overseas Passenger Terminal/5 Hickson Road, The Rocks NSW, Australia",
             "geometry" : {
                "location" : {
                   "lat" : -33.8583790,
                   "lng" : 151.2100270
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
             "id" : "f181b872b9bc680c8966df3e5770ae9839115440",
             "name" : "Quay",
             "rating" : 4.10,
             "reference" : "CnRiAAAADmPDOkn3znv_fX78Ma6X5_t7caEGNdSWnpwMIdDNZkLpVKPnQJXP1ghlySO-ixqs28UtDmJaOlCHn18pxpj7UQjRzR4Kmye6Gijoqoox9bpkaCAJatbJGZEIIUwRbTNIE_L2jGo5BDqiosqU2F5QdBIQbXKrvfQuo6rmu8285j7bDBoUrGrN4r6XQ-PVm260PFt5kwc3EfY",
             "types" : [ "cafe", "bar", "restaurant", "food", "establishment" ]
          },
          {
             "formatted_address" : "107 George Street, The Rocks NSW, Australia",
             "geometry" : {
                "location" : {
                   "lat" : -33.8597750,
                   "lng" : 151.2085920
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
             "id" : "7beacea28938ae42bcac04faf79a607bf84409e6",
             "name" : "Rockpool",
             "rating" : 4.0,
             "reference" : "CnRlAAAAVK4Ek78r9yHV56I-zbaTxo9YiroCbTlel-ZRj2i6yGAkLwNMm_flMhCl3j8ZHN-jJyG1TvKqBBnKQS2z4Tceu-1kZupZ1HSo5JWRBKd7qt2vKgT8VauiEBQL-zJiKVzSy5rFfilKDLSiLusmdi88ThIQqqj6hKHn5awdj6C4f59ifRoUg67KlbpuGuuW7S1tAH_EyBl6KE4",
             "types" : [ "restaurant", "food", "establishment" ]
          },
          {
             "formatted_address" : "483 George Street, Sydney NSW, Australia",
             "events" : [
                {
                  "event_id" : "7lH_gK1GphU",
                  "summary" : "Google Maps Developer Meetup: Rockin' out with the Places API",
                  "url" : "https://developers.google.com/places"
                }
              ],
             "geometry" : {
                "location" : {
                   "lat" : -33.8731950,
                   "lng" : 151.2063380
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/civic_building-71.png",
             "id" : "017049cb4e82412aaf0efbde890e82b7f2987c16",
             "name" : "Chinatown Sydney",
             "rating" : 4.0,
             "reference" : "CnRuAAAAsLNeRQtKD7TEUXWG6gYD7ByOVKjQE61GSyeGZrX-pOPVps2BaLBlH0zBHlrVU9DKhsuXra075loWmZUCbczKDPdCaP9FVJXB2NsZ1q7188pqRFik58S9Z1lcWjyVoVqvdUUt9bDMLqxVT4ENmolbgBIQ9Wy0sgDy0BgWyg5kfPMHCxoUOvmhfKC-lTefXGgnsRqEQwn8M0I",
             "types" : [
                "city_hall",
                "park",
                "restaurant",
                "doctor",
                "train_station",
                "local_government_office",
                "food",
                "health",
                "establishment"
             ]
         },
         {
             "formatted_address" : "529 Kent Street, Sydney NSW, Australia",
             "geometry" : {
                "location" : {
                   "lat" : -33.8750460,
                   "lng" : 151.2052720
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
             "id" : "827f1ac561d72ec25897df088199315f7cbbc8ed",
             "name" : "Tetsuya's",
             "rating" : 4.30,
             "reference" : "CnRmAAAAmmm3dlSVT3E7rIvwQ0lHBA4sayvxWEc4nZaXSSjRtfKRGoYnfr3d5AvQGk4e0u3oOErXsIJwtd3Wck1Onyw6pCzr8swW4E7dZ6wP4dV6AsXPvodwdVyqHgyGE_K8DqSp5McW_nFcci_-1jXb5Phv-RIQTzv5BjIGS0ufgTslfC6dqBoU7tw8NKUDHg28bPJlL0vGVWVgbTg",
             "types" : [ "restaurant", "food", "establishment" ]
         },
         {
             "formatted_address" : "Upper Level, Overseas Passenger Terminal/5 Hickson Road, The Rocks NSW, Australia",
             "geometry" : {
                "location" : {
                   "lat" : -33.8583790,
                   "lng" : 151.2100270
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/cafe-71.png",
             "id" : "f181b872b9bc680c8966df3e5770ae9839115440",
             "name" : "Quay",
             "rating" : 4.10,
             "reference" : "CnRiAAAADmPDOkn3znv_fX78Ma6X5_t7caEGNdSWnpwMIdDNZkLpVKPnQJXP1ghlySO-ixqs28UtDmJaOlCHn18pxpj7UQjRzR4Kmye6Gijoqoox9bpkaCAJatbJGZEIIUwRbTNIE_L2jGo5BDqiosqU2F5QdBIQbXKrvfQuo6rmu8285j7bDBoUrGrN4r6XQ-PVm260PFt5kwc3EfY",
             "types" : [ "cafe", "bar", "restaurant", "food", "establishment" ]
          },
          {
             "formatted_address" : "107 George Street, The Rocks NSW, Australia",
             "geometry" : {
                "location" : {
                   "lat" : -33.8597750,
                   "lng" : 151.2085920
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
             "id" : "7beacea28938ae42bcac04faf79a607bf84409e6",
             "name" : "Rockpool",
             "rating" : 4.0,
             "reference" : "CnRlAAAAVK4Ek78r9yHV56I-zbaTxo9YiroCbTlel-ZRj2i6yGAkLwNMm_flMhCl3j8ZHN-jJyG1TvKqBBnKQS2z4Tceu-1kZupZ1HSo5JWRBKd7qt2vKgT8VauiEBQL-zJiKVzSy5rFfilKDLSiLusmdi88ThIQqqj6hKHn5awdj6C4f59ifRoUg67KlbpuGuuW7S1tAH_EyBl6KE4",
             "types" : [ "restaurant", "food", "establishment" ]
          },
          {
             "formatted_address" : "483 George Street, Sydney NSW, Australia",
             "events" : [
                {
                  "event_id" : "7lH_gK1GphU",
                  "summary" : "Google Maps Developer Meetup: Rockin' out with the Places API",
                  "url" : "https://developers.google.com/places"
                }
              ],
             "geometry" : {
                "location" : {
                   "lat" : -33.8731950,
                   "lng" : 151.2063380
                }
             },
             "icon" : "http://maps.gstatic.com/mapfiles/place_api/icons/civic_building-71.png",
             "id" : "017049cb4e82412aaf0efbde890e82b7f2987c16",
             "name" : "Chinatown Sydney",
             "rating" : 4.0,
             "reference" : "CnRuAAAAsLNeRQtKD7TEUXWG6gYD7ByOVKjQE61GSyeGZrX-pOPVps2BaLBlH0zBHlrVU9DKhsuXra075loWmZUCbczKDPdCaP9FVJXB2NsZ1q7188pqRFik58S9Z1lcWjyVoVqvdUUt9bDMLqxVT4ENmolbgBIQ9Wy0sgDy0BgWyg5kfPMHCxoUOvmhfKC-lTefXGgnsRqEQwn8M0I",
             "types" : [
                "city_hall",
                "park",
                "restaurant",
                "doctor",
                "train_station",
                "local_government_office",
                "food",
                "health",
                "establishment"
             ]
          }
       ],
       "status" : "OK"
    };

    var PitstopRouter = Backbone.Router.extend({
        routes: {
            "" : "index",
            "map" : "map.html"
        },
        start: function() {
            Backbone.history.start();
        },
        initialize: function() {
            this.collection = new Backbone.Collection;
            this.collection.reset(fakeGoogleJson);

            this.pitstopView = new PitstopCollectionView({
                collection: this.collection
            });
        }
    });
    return PitstopRouter;

});