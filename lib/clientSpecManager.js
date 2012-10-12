var glob = require("glob");

function findSpecs (specRootDirectory, callback) {
    var options = {
        cwd: specRootDirectory
    };
    console.log("Globbing", options);
    glob("**/*.spec.js", options, function (err, files) {
        console.log("Files", files);

        var modulePathsString = "";
        var modulePaths = files.map(function (file) {
            var fileWithoutExtension = file.slice(0, file.length-3);
            //return '"' + fileWithoutExtension + '"';
            return fileWithoutExtension;
        });

        //modulePathsString = '[' + modulePaths.join(", ") + ']';

        console.log("ModulePaths", modulePaths);
        callback(modulePaths);
    });
}

exports.findSpecs = findSpecs;
