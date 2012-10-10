var expect = require('expect.js');
var handler = require('../lib/socketHandler');
var testSocket;

describe("Socket Handler", function () {
    beforeEach(function () {
        testSocket = {
            on: function () {
            },
            emit: function (channel, data) {
            }
        };
    });

    describe("When a connection is made", function () {
        it("Responds with hello world", function (done) {
            testSocket.emit = function (channel, data) {
                expect(data).not.to.be(undefined);
                expect(data.value).to.be('Hello World');
                done();
            };
            handler(testSocket);
        });
    });
});
