'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

var task = function (name, options) {
    // This means that you don't have to call this.emit('end') yourself
    var actualErrorHandler = options.onError;
    options.onError = function () {
        actualErrorHandler.apply(this, arguments);
        this.emit('end');
    };

    return require('./tasks/' + name)(gulp, plugins, options);
};

module.exports = {
    task: task,
    plugins: plugins,
    config: defaults,
    log: plugins.util.log
};