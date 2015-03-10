'use strict';

var extend = require('extend');

var defaults = {
    karmaAction: 'run',
};

module.exports = function (gulp, plugins, options) {
    options = extend(true, defaults, options);

    return function () {
        return gulp.src(options.src)
            .pipe(plugins.plumber({ errorHandler: options.onError }))
            .pipe(plugins.karma({
                configFile: options.karmaConfigFile,
                action: options.karmaAction
            }))
            .on('error', function(err) { throw err; });
    };
};