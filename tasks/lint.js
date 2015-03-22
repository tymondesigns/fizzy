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
            css: function () {
                return gulp.src(options.src)
                    .pipe(plugins.if(! options.dieOnError, plugins.plumber({ errorHandler: options.onError })))
                    .pipe(plugins.csslint(options.config))
                    .pipe(plugins.csslint.reporter());
            }
        };

        if (! _.contains(linters, options.type)) {
            this.emit('error', new plugins.util.PluginError('fizzy', 'Lint type not found'));
        }

        return linters[options.type]();
    };
};