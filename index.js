'use strict';

var gulp = require('gulp'),
extend = require('extend'),
plugins = require('gulp-load-plugins')({
    requireFn: function (name) {
        // Temporary workaround for jackfranklin/gulp-load-plugins#56
        return require(__dirname + '/node_modules/' + name);
    }
});

// set some defaults
var defaults = {
    onError: function (err) {
        plugins.util.log(err.toString());
    }
};

module.exports = function (name, options) {
    options = extend(true, defaults, options);

    // This means that you don't have to call this.emit('end') yourself
    var actualErrorHandler = options.onError;
    options.onError = function () {
        actualErrorHandler.apply(this, arguments);
        this.emit('end');
    };

    return require('./tasks/' + name)(gulp, plugins, options);
};