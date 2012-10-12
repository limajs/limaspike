var expect = require("expect.js");
var specManager = require("../lib/clientSpecManager");

describe("Client Spec Manager", function () {
    it("Exists", function (done) {
        specManager.findSpecs(__dirname + "/mockSpecDirectory", function (specPaths) {
            expect(specPaths[0]).to.be("featureone.spec");
            expect(specPaths[1]).to.be("subdir/featuretwo.spec");
            done();
        });
    });
});
