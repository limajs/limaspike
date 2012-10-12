var http = require('http');
var requestHandler = require('./lib/requestHandler');
var socketHandler = require('./lib/socketHandler');
var app;
var io;

function createServer (port) {
    app = http.createServer(requestHandler);
    io = require('socket.io').listen(app);
    io.sockets.on('connection', socketHandler);

    app.listen(port);
    console.log("Lima Server - listening on port", port);
}

module.exports = createServer;
