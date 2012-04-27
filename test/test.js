var loader = require('../lib/closureloader');

loader('.', function(err, goog) {
    if (err) {
        throw err;
    } else {
        goog.require('test.Baz');
        goog.require('test.Foo');

        console.log(test.Baz());
        console.log(test.Foo());
    }
});
