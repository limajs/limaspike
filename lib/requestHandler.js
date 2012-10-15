var fs = require('fs');
var path = require('path');

function handleRequest (req, res) {
    if (req.url === '/test') {
        fs.readFile(__dirname + '/../client/html/specrunner.html', function (err, data) {
            res.end(data);
        });
    } else if (req.url.substr(0, 6) === '/mocha') {
        loadMochaFile(req.url, function (err, mochaFile) {
            res.end(mochaFile);
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
    } else if (req.url === '/') {
        var appHtmlPath = path.join(__dirname, '/../client/html/app.html');
        fs.readFile(appHtmlPath, function (err, data) {
            res.end(data);
        });
    } else if (req.url.length > 0) {
        var appFilePath = path.join(process.cwd(), req.url);
        console.log("Static File", appFilePath);
        loadApplicationFile(req.url, function (err, appFile) {
            if (err) {
                console.log("Error Loading Static File", err);
                res.statusCode = 404;
                res.end();
            }
            res.end(appFile);
        });
    } else {
        res.end();
    }
}

function loadJsFile (url, callback) {
    var jsFilePath = path.join(__dirname, '/../client', url);
    fs.readFile(jsFilePath, callback);
}

function loadMochaFile (url, callback) {
    var mochaFilePath = path.join(__dirname, '/../node_modules', url);
    fs.readFile(mochaFilePath, callback);
}

function loadApplicationFile (url, callback) {
    var appFilePath = path.join(process.cwd(), url);
    fs.readFile(appFilePath, callback);
}

module.exports = handleRequest;
