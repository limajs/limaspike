var expect = require('expect.js');
var handler = require('../lib/requestHandler');

describe("The Request Handler", function () {
    it("Handles a request for the root", function () {
        var actualResponse = {};
        var req = {
            url: ''
        };
        var res = {
            end: function (response) {
                actualResponse = response;
            }
        };
        handler(req, res);
        expect(actualResponse).to.be('Hello Lima');
    });

    it("Handles a request for /test by returning a specrunner.html page", function (done) {
        var res = {
            end: function (body) {
                var specRunnerHtml = body.toString();
                expect(specRunnerHtml).to.contain('<title>Lima Spec Runner</title>');
                done();
            }
        };
        var req = {
            url: '/test'
        };

        handler(req, res);
    });

    it("Handles requests for /js files", function () {
        var res = {
            end: function (body) {
                expect(body.toString()).to.contain('RequireJS');
            }
        };

        var req = {
            url: '/js/require.js'
        };

        handler(req, res);
    });

    it("Handles requests for mocha files", function () {
        var res = {
            end: function (body) {
                expect(body.toString()).to.contain('exports = module.exports = Mocha;');
            }
        };

        var req = {
            url: '/mocha/mocha.js'
        };

        handler(req, res);
    });

    it("Returns a 404 if js file is not found", function (done) {
        var res = {
            end: function () {
                expect(this.statusCode).to.be(404);
                done();
            }
        };

        var req = {
            url: '/js/FileWhichDoesntExist'
        };

        handler(req, res);
    });
});
