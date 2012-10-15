var expect = require('expect.js');
var rewire = require('rewire');
var handler = rewire('../lib/requestHandler.js');
var mockfs = {};
handler.__set__("fs", mockfs);

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
                expect(specRunnerHtml).to.contain('Dummy Specrunner File');
                done();
            }
        };
        var req = {
            url: '/test'
        };
        mockfs.readFile = function (name, callback) {
            expect(name).to.contain('specrunner.html');
            callback(null, 'Dummy Specrunner File');
        }

        handler(req, res);
    });

    it("Handles requests for /js files", function () {
        var res = {
            end: function (body) {
                expect(body.toString()).to.be('RequireJSFile');
            }
        };

        var req = {
            url: '/js/require.js'
        };

        mockfs.readFile = function (name, callback) {
            expect(name).to.contain('require.js');
            callback(null, "RequireJSFile");
        }
        handler(req, res);
    });

    it("Handles requests for mocha files", function () {
        var res = {
            end: function (body) {
                expect(body.toString()).to.be("MochaJSFile");
            }
        };

        var req = {
            url: '/mocha/mocha.js'
        };

        mockfs.readFile = function (name, callback) {
            expect(name).to.contain('mocha.js');
            callback(null, "MochaJSFile");
        }
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

        mockfs.readFile = function (name, callback) {
            callback('FileNotFound!', null);
        }
        handler(req, res);
    });
});
