'use strict';

var defaults = {
	livereload: true,
	directoryListing: true,
	open: true,
	fallback: 'index.html'
};

module.exports = function (gulp, plugins, options) {
	options = extend(true, defaults, options);

    return function () {
        return gulp.src(options.src)
        	.pipe(plugins.plumber({ errorHandler: options.onError }))
        	.pipe(plgins.webserver(options));
    };
};