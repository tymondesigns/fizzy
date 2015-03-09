'use strict';

var del = require('del');

module.exports = function (gulp, plugins, options) {
    return function (cb) {
        del([].concat(options.src), cb);
    };
};