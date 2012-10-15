var glob = require("glob");

function findSpecs (specRootDirectory, callback) {
    var options = {
        cwd: specRootDirectory
    };
    console.log("Globbing", options);
    glob("**/specs/**/*.spec.js", options, function (err, files) {
        var modulePathsString = "";
        var modulePaths = files.map(function (file) {
            var fileWithoutExtension = file.slice(0, file.length-3);
            return fileWithoutExtension;
        });

        callback(modulePaths);
    });
}

exports.findSpecs = findSpecs;
