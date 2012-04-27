var calcdeps = require('calcdeps'),
    vm = require('vm'),
    fs = require('fs');

function closureloader(path, callback) {
    var cache = {},
        options = {
            exclude: [],
            dep: [],
            input: [],
            path: Array.isArray(path) ? path : [path],
            output_mode: 'deps'
        };

    function require(dependency) {
        if (!cache[dependency]) {
            throw 'Dependency not found: ' + dependency;
        }

        // Prevent a script from being loaded more than once
        if (!cache[dependency].loaded) {
            vm.runInThisContext(fs.readFileSync(cache[dependency].path));
            cache[dependency].loaded = true;
        }
    }

    function provide(obj) {
        var namespaces = obj.split('.'),
            tmp = global;

        namespaces.forEach(function(part) {
            if (!tmp[part]) {
                tmp[part] = {};
            }
            tmp = tmp[part];
        });
    }

    // Clobber the global namespace
    global.goog = {
        require: require,
        provide: provide
    };

    calcdeps.calcdeps(options, function (err, dependencies) {
        if (err) {
            callback(err);
        } else {
            dependencies.forEach(function (dependency) {
                dependency.provide.forEach(function(provide) {
                    cache[provide] = dependency;
                });
            });

            // Only expose goog.require, we don't want people to start writing
            // all their server code using this.
            callback(null, {
                require: goog.require
            });
        }
    });
}
module.exports = closureloader;
