'use strict';

var stylish = require('jshint-stylish');
var extend = require('extend');
var through = require('through2');

var defaults = {
	sourcemaps: true,
	minifySuffix: '.min',
	uglifyOptions: {}
};

module.exports = function (gulp, plugins, options) {
	options = extend(true, defaults, options);

    return function () {
        return gulp.src(options.src)
        	.pipe(plugins.plumber({ errorHandler: options.onError }))
        	.pipe(options.sourcemaps ? $.sourcemaps.init() : through.obj())
        	.pipe(plugins.uglify(options.uglifyOptions))
            .pipe(plugins.rename({ suffix: options.minifySuffix }))
            .pipe(options.sourcemaps ? $.sourcemaps.write('./') : through.obj())
            .pipe(gulp.dest(options.dest));
    };
};
