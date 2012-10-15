var expect = require("expect.js");
var rewire = require("rewire");
var specManager = rewire("../lib/clientSpecManager");

describe("Client Spec Manager", function () {
    it("Finds all spec files in the specs folder", function () {
        var mockGlob = function (pattern, options, callback) {
            expect(pattern).to.be("**/specs/**/*.spec.js");
            expect(options.cwd).to.be("/locationOfSpecsDirectory");
            callback (null, ['specs/featureone.spec.js', 'specs/subdir/featuretwo.spec.js'] );
        }
        specManager.__set__("glob", mockGlob);
        specManager.findSpecs("/locationOfSpecsDirectory", function (specs) {
            expect(specs.length).to.be(2);
            expect(specs[0]).to.be("specs/featureone.spec");
            expect(specs[1]).to.be("specs/subdir/featuretwo.spec");
        });
    });
});
