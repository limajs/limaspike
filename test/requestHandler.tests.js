var handler = require('../lib/requestHandler');

describe("The Request Handler", function () {
    it("Returns Hello Lima", function () {
        var actualResponse;
        var req = {};
        var res = {
            end: function (response) {
                actualResponse = response;
            }
        };
        handler(req, res);
        actualResponse.should.equal('Hello Lima');
    });
});
