'use strict';

var gitdown = require('gitdown');

module.exports = function (gulp, plugins, options) {
    return function () {
        return gitdown
            .read(options.src)
            .write(options.dest);
    };
}