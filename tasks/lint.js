'use strict';

var stylish = require('jshint-stylish');
var _ = require('lodash');

var defaults = {
    dieOnError: false,
    type: 'js',
    config: {}
};

module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

    return function () {

        var linters = {
            js: function () {
                return gulp.src(options.src)
                    .pipe(plugins.if(! options.dieOnError, plugins.plumber({ errorHandler: options.onError })))
                    .pipe(plugins.jshint(options.config))
                    .pipe(plugins.jshint.reporter(stylish))
                    .pipe(plugins.if(options.dieOnError, plugins.jshint.reporter('fail')));
            },
            es6: function () {
                return gulp.src(options.src)
                    .pipe(plugins.if(! options.dieOnError, plugins.plumber({ errorHandler: options.onError })))
                    .pipe(plugins.eslint(options.config))
                    .pipe(plugins.eslint.format())
                    .pipe(plugins.if(options.dieOnError, plugins.eslint.failOnError()));
            },
            css: function () {
                return gulp.src(options.src)
                    .pipe(plugins.if(! options.dieOnError, plugins.plumber({ errorHandler: options.onError })))
                    .pipe(plugins.csslint(options.config))
                    .pipe(plugins.csslint.reporter());
            }
        };

        if (! linters.hasOwnProperty(options.type)) {
            this.emit('error', new plugins.util.PluginError('fizzy', 'Lint type not found'));
        }

        return linters[options.type]();
    };
};