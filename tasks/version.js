'use strict';

var semver = require('semver');
var _ = require('lodash');

var defaults = {
    prompt: true,
    version: false,
    importance: 'minor',
    dest: './'
};


module.exports = function (gulp, plugins, options) {
    options = _.extend(defaults, options);

    var promptVersion = function (currentVersion, callback) {
        return gulp.src('')
            .pipe(plugins.prompt.prompt({
                type: 'list',
                name: 'bump',
                message: 'What type of version bump would you like to do ? (current version is ' + currentVersion + ')',
                choices: [
                    'patch (' + currentVersion + ' --> ' + semver.inc(currentVersion, 'patch') + ')',
                    'minor (' + currentVersion + ' --> ' + semver.inc(currentVersion, 'minor') + ')',
                    'major (' + currentVersion + ' --> ' + semver.inc(currentVersion, 'major') + ')',
                    'none (exit)'
                ]
            }, function(res) {
                var newVer;

                if (res.bump.match(/^patch/)) {
                    newVer = semver.inc(currentVersion, 'patch');
                } else if(res.bump.match(/^minor/)) {
                    newVer = semver.inc(currentVersion, 'minor');
                } else if(res.bump.match(/^major/)) {
                    newVer = semver.inc(currentVersion, 'major');
                }

                if (newVer && _.isFunction(callback)) {
                    return callback(newVer);
                } else {
                    return;
                }
            }));
    };

    // no prompt shown here as the version has been explicitly provided
    if (! options.prompt) {
        return function () {
            return gulp.src(options.src)
                .pipe(plugins.if(options.version, plugins.bump({ version: options.version }), plugins.bump({ type: options.importance })))
                .pipe(gulp.dest(options.dest));
        }
    }

    // we need the current version
    if (! options.currentVersion) this.emit('error', new plugins.util.PluginError('fizzy', 'You need to specify the current version'));

    // use the new version from the prompt
    return function () {
        return promptVersion(options.currentVersion, function (newVersion) {
            return gulp.src(options.src)
                .pipe(plugins.bump({ version: newVersion }))
                .pipe(gulp.dest(options.dest));
        });
    };
};