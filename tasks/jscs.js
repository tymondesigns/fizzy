'use strict';

var _ = require('lodash');

var defaults = {
    jscsOptions: {
        fix: false,
        configPath: '.jscsrc',
        // reporter: require('jscs-stylish').path
    }
};

module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

    return function () {
        return gulp.src(options.src)
            .pipe(plugins.plumber({ errorHandler: options.onError }))
            .pipe(plugins.jscs(options.jscsOptions))
            .pipe(plugins.if(options.jscsOptions.fix, gulp.dest(options.src)));
    };
}