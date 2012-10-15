var expect = require('expect.js');
var path = require('path');
var rewire = require('rewire');
var handler = rewire('../lib/requestHandler.js');
var mockfs = {};
handler.__set__("fs", mockfs);

describe("The Request Handler", function () {
    it("Handles a request for the root", function (done) {
        var actualResponse = {};
        var req = {
            url: '/'
        };
        var res = {
            end: function (response) {
                expect(response).to.be('Main HTML');
                done();
            }
        };
        mockfs.readFile = function (name, callback) {
            expect(name).to.contain('app.html');
            callback(null, 'Main HTML');
        };
        handler(req, res);
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
        };

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
        };
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
        };
        handler(req, res);
    });

    it("Looks in the process.cwd directory for any other static files", function (done) {
        var req = {
            url:'/features/featureone.js'
        };
        var res = {
            end: function (body) {
                expect(body).to.be('My Test Feature Code');
                done();
            }
        };
        mockfs.readFile = function (name, callback) {
            var expectedFilePath = path.join(process.cwd(), '/features/featureone.js');
            expect(name).to.be(expectedFilePath);
            callback(null, "My Test Feature Code");
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

        mockfs.readFile = function (name, callback) {
            callback('FileNotFound!', null);
        };
        handler(req, res);
    });
});
