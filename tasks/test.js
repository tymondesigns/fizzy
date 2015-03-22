'use strict';

var _ = require('lodash');

var defaults = {
    karmaAction: 'run',
};

module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

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