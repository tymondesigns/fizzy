'use strict';

var stylish = require('jshint-stylish');
var extend = require('extend');

var defaults = {
    dieOnError: false
};

module.exports = function (gulp, plugins, options) {
    options = extend(true, defaults, options);

    return function () {
        return gulp.src(options.src)
            .pipe(plugins.if(! options.dieOnError, plugins.plumber({ errorHandler: options.onError })))
            .pipe(plugins.jshint())
            .pipe(plugins.jshint.reporter(stylish))
            .pipe(plugins.if(options.dieOnError, plugins.jshint.reporter('fail')))
    };
};