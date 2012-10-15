var path = require('path');
var clientSpecManager = require('./clientSpecManager');

function socketHandler (socket) {

    clientSpecManager.findSpecs(process.cwd(), function (specs) {
        console.log("Found Specs", specs);
        socket.emit('runspecs', specs);
    });

    socket.on('spec', function (data) {
        console.log("LimaSpecs", data);
    });
    socket.on('spec_pass', function (data) {
        console.log("LimaSpec passed", data);
    });
    socket.on('spec_fail', function (data) {
        console.log("LimaSpec failed", data);
    });
}

module.exports = socketHandler;
