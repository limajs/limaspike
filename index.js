var http = require('http');
var requestHandler = require('./lib/requestHandler');

function createServer (port) {
    http.createServer(requestHandler).listen(port);
    console.log("Lima Server - listening on port", port);
}

module.exports = createServer;
