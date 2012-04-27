goog.provide('test.Foo');

goog.require('test.Bar');
goog.require('test.Baz');

test.Foo = function() {
    return 'Foo!' + ' ' + test.Bar() + ' ' + test.Baz();
};
