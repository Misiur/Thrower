/*
 * scripts.js
 * Copyright (C) 2015 adelciotto <anthdel.developer@gmail.com>
 *
 * Distributed under terms of the MIT license.
 */

import gulp from 'gulp';
import gutil from 'gulp-util';
import gulpif from 'gulp-if';
import fs from 'fs'; 
import livereload from 'gulp-livereload';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import uglify from 'gulp-uglify';
import merge from 'merge-stream';
import browserify from 'browserify';
import babelify from 'babelify';
import watchify from 'watchify';
import sourcemaps from 'gulp-sourcemaps';
import _ from 'underscore';
import jshint from 'gulp-jshint';
import cached from 'gulp-cached';

const browserifyConfig = {
    paths: global.paths.js,
    noParse: [require.resolve('matter-js')]
};

gulp.task('scripts', function () {
    let bro;

    if (global.isDevEnv) {
        // if watch mode make sure to use watchify for fast rebundling
        bro = watchify(browserify(global.paths.jsEntry,
            _.extend(watchify.args, browserifyConfig, {
                debug: true
            })));

        // on any es6 file change, perform a rebundle
        let pathToJS = fs.realpathSync(global.paths.js);
        bro.on('update', function (changedFiles) {
            if (changedFiles) {
                let srcFiles = changedFiles.filter(function (filepath) {
                    return filepath.indexOf(pathToJS) === 0;
                });

                var lintStream = gulp.src(srcFiles)
                    .pipe(cached('jshint'), { optimizeMemory: true })
                    .pipe(jshint())
                    .pipe(jshint.reporter('jshint-stylish'));

                return merge(lintStream, rebundle(bro));
            }

            return rebundle(bro);
        });
        bro.on('log', gutil.log);
    } else {
        bro = browserify(global.paths.jsEntry, browserifyConfig);
    }

    bro.transform(babelify.configure({
        compact: true
    }));

    return rebundle(bro);
});

function rebundle(bundler) {
    return bundler.bundle()            
        .on('error', function (err) {
            gutil.log(gutil.colors.red('Browserify Error\n'), err.message);
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(gulpif(global.isDevEnv, sourcemaps.init({
            loadMaps: true
        })))
        .pipe(gulpif(global.isDevEnv, sourcemaps.write()))
        .pipe(gulpif(!global.isDevEnv, uglify()))
        .pipe(gulp.dest(`${global.paths.dist}/js`))
        .pipe(gulpif(global.isDevEnv, livereload()));
}