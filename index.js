var http = require('http');
var requestHandler = require('./lib/requestHandler');

function createServer (port) {
    http.createServer(requestHandler).listen(port);
}

module.exports = createServer;
