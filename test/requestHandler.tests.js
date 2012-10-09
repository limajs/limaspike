var should = require('chai').should();
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
        actualResponse.should.equal('Hello Lima');
    });

    it("Handles a request for /test by returning a specrunner.html page", function (done) {
        var res = {
            end: function (body) {
                should.exist(body);
                var specRunnerHtml = body.toString();
                specRunnerHtml.should.contain('<title>Lima Spec Runner</title>');
                done();
            }
        };
        var req = {
            url: '/test'
        };

        handler(req, res);
    });
});
