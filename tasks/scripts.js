'use strict';

var stylish = require('jshint-stylish');
var extend = require('extend');

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
            .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.init())
            .pipe(plugins.uglify(options.uglifyOptions))
            .pipe(plugins.rename({ suffix: options.minifySuffix }))
            .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.write('./'))))
            .pipe(gulp.dest(options.dest));
    };
};
