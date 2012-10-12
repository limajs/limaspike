var clientSpecManager = require('./clientSpecManager');

function socketHandler (socket) {

    clientSpecManager.findSpecs('/Users/simon/dev/limaspike/client/js', function (specs) {
        console.log("FindSpecs:", specs);
        socket.emit('runspecs', specs);
    });

    socket.on('spec', function (data) {
        console.log("LimaSpecs", data);
    });
    socket.on('spec_pass', function (data) {
        console.log("LimaSpec passed", data);
    });
}

module.exports = socketHandler;
