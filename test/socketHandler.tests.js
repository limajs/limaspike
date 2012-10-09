var should = require('chai').should();
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
                should.exist(data);
                data.value.should.equal('Hello World');
                done();
            };
            handler(testSocket);
        });
    });
});
