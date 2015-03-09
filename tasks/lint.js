'use strict';

var stylish = require('jshint-stylish');
var extend = require('extend');
var through = require('through2');

var defaults = {
	dieOnError: false
};

module.exports = function (gulp, plugins, options) {
	options = extend(true, defaults, options);

    return function () {
        return gulp.src(options.src)
        	.pipe(options.dieOnError ? through.obj() : plugins.plumber({ errorHandler: options.onError }))
			.pipe(plugins.jshint())
			.pipe(plugins.jshint.reporter(stylish))
        	.pipe(options.dieOnError ? plugins.jshint.reporter('fail') : through.obj());
    };
};