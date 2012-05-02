## Closure Loader

Load code using the Closure library dependency syntax in Node.js

### Installation

    npm install closureloader

### Usage

    var loader = require('closureloader');

    loader('src', function(err, goog) {
        if (err) {
            throw err;
        } else {
            goog.require('my.example.Class');

            // use it as normal
            var c = new my.example.Class();
        }
    });

The `closureloader` method takes two parameters `path` and `callback`. The `path` parameter can either be a string or an array. It should point to the directory or directories containing the code that uses the Google Closure compiler dependency syntax. The `callback` method should be a function that is called with two parameters, `err` and `goog`. If `err` is not `null`, an error occured while reading the path(s). If everything worked as it should, you can use the second parameter `goog` to `require` your code. The `goog.provide` function is not available on the `goog` object.
