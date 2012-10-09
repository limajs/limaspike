var fs = require('fs');

function handleRequest (req, res) {
    if(req.url === '/test') {
        fs.readFile(__dirname + '/specrunner.html', function (err, data) {
            res.end(data);
        });
    } else {
        res.end('Hello Lima');
    }
}

module.exports = handleRequest;
