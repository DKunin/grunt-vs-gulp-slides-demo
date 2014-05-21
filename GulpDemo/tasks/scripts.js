var gulp = require('gulp'),
	connect = require('gulp-connect'),
  reactify = require('gulp-react'),
  browserify = require('gulp-browserify'),
	settings = require('../.gulpconfig/settings'),
  handleErrors = require('../.gulpconfig/handleErrors'),
  source       = require('vinyl-source-stream'),
	paths = settings.paths;

var browserif = function() {
  gulp.src(paths.src.scripts + '/main.js', {read: false})
    .pipe(browserify({
       transform: ['reactify'],
       extensions: ['.jsx'],
       debug : true
    }))

    .pipe(gulp.dest(paths.dist.scripts))
    .pipe(connect.reload())
};

module.exports = browserif;