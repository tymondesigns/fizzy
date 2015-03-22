'use strict';

var stylish = require('jshint-stylish');
var _ = require('lodash');

var defaults = {
    sourcemaps: true,
    sourcemapWriteOptions: {},
    minifySuffix: '.min',
    uglifyOptions: {},
    header: [],
};

module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

    return function () {
        return gulp.src(options.src)
            .pipe(plugins.plumber({ errorHandler: options.onError }))
            .pipe(gulp.dest(options.dest))
            .pipe(plugins.rename({ suffix: options.minifySuffix }))
            .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins.uglify(options.uglifyOptions))
            .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.write('./', options.sourcemapWriteOptions)))
            .pipe(plugins.if(options.header.length !== 0, plugins.header.apply(this, options.header)))
            .pipe(gulp.dest(options.dest));
    };
};
