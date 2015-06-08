'use strict';

var _ = require('lodash');

var defaults = {
    fix: false
};

module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

    return function () {
        return gulp.src(options.src)
            .pipe(plugins.plumber({ errorHandler: options.onError }))
            .pipe(plugins.jscs({ fix: options.fix }))
            .pipe(plugins.if(options.fix, gulp.dest(options.src)));
    };
}