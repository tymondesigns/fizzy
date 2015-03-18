'use strict';

var stylish = require('jshint-stylish');
var extend = require('extend');

var defaults = {
    dieOnError: false,
    type: 'js',
    config: {}
};

module.exports = function (gulp, plugins, options) {
    options = extend(true, defaults, options);

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

        if (! linters.hasOwnProperty(options.type)) {
            this.emit('error', new plugins.util.PluginError('fizzy', 'Lint type not found'));
        }

        return linters[options.type]();
    };
};