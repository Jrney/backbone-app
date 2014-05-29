define(["app/js/app/models/pitstopModel"], function(PitstopModel) {

    describe("pitstopModel", function() {

    it("has default values", function() {
        var pitstop = new PitstopModel();

        expect(pitstop).to.be.ok
        expect(pitstop.get("id")).to.equal("");
        expect(pitstop.get("name")).to.equal("");
        expect(pitstop.get("rating")).to.equal("");
        expect(pitstop.get("address")).to.equal("");
    });

    it("sets passed attributes", function(){
        var pitstop = new PitstopModel({
            name: "CoCo's Curry House",
            rating: "5",
            id: "827f1ac561d72ec25897df088199315f7cbbc8ed",
            address: "123 Fake Street, Fake City, Antartica"
        });

        expect(pitstop.get("name")).to.equal("CoCo's Curry House");
        expect(pitstop.get("rating")).to.equal("5");
        expect(pitstop.get("id")).to.equal("827f1ac561d72ec25897df088199315f7cbbc8ed");
        expect(pitstop.get("address")).to.equal("123 Fake Street, Fake City, Antartica");

    });

    });
});
