var gulp = require('gulp'),
  	connect = require('gulp-connect'),
    jade = require('gulp-jade'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    rev = require('gulp-rev'),
    header = require('gulp-header'),
    pkg = require('../package.json'),
    minifyCss = require('gulp-minify-css'),
    settings = require('../.gulpconfig/settings'),
    paths = settings.paths;

var banner = settings.banner;

var head = function(){
  return header(banner, { pkg : pkg });
};

module.exports = function() {
    gulp.src(paths.src.views+'*.jade')
      .pipe(jade({
        pretty: true,
        basedir: paths.srcBase
      }))
    .pipe(gulp.dest(paths.srcBase))
    .pipe(usemin({
      js: [uglify(), rev(), head()]
    }))
    .pipe(gulp.dest(paths.dist.views))
    .pipe(connect.reload());
};