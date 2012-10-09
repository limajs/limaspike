var fs = require('fs');

function handleRequest (req, res) {
    if (req.url === '/test') {
        fs.readFile(__dirname + '/../client/html/specrunner.html', function (err, data) {
            res.end(data);
        });
    } else if (req.url.substr(0, 4) === '/js/') {
        loadJsFile(req.url, function (err, jsFile) {
            if (err) {
                res.statusCode = 404;
                res.end();
            } else {
                res.end(jsFile);
            }
        });
    } else {
        res.end('Hello Lima');
    }
}

function loadJsFile (url, callback) {
    var jsFilePath = __dirname + '/../client' + url;
    fs.readFile(jsFilePath, callback);
}

module.exports = handleRequest;
