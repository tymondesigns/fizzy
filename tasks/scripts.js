'use strict';

var stylish = require('jshint-stylish');
var _ = require('lodash');

var defaults = {
    sourcemaps: true,
    sourcemapDest: './',
    sourcemapWriteOptions: {},
    minifySuffix: '.min',
    uglifyOptions: {},
    header: [],
    babel: false,
    babelOptions: {}
};

module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

    return function () {
        return gulp.src(options.src)
            .pipe(plugins.plumber({ errorHandler: options.onError }))
            .pipe(gulp.dest(options.dest))
            .pipe(plugins.rename({ suffix: options.minifySuffix }))
            .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.init()))
            .pipe(plugins.if(options.babel, plugins.babel(options.babelOptions)))
            .pipe(plugins.uglify(options.uglifyOptions))
            .pipe(plugins.if(options.sourcemaps, plugins.sourcemaps.write(options.sourcemapDest, options.sourcemapWriteOptions)))
            .pipe(plugins.if(options.header.length !== 0, plugins.header.apply(this, options.header)))
            .pipe(gulp.dest(options.dest));
    };
};
