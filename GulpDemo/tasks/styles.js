var gulp = require('gulp'),
	connect = require('gulp-connect'),
  stylus = require('gulp-stylus'),
	settings = require('../.gulpconfig/settings'),
	paths = settings.paths,
  nib = require('nib')

module.exports = function () {
  gulp.src(paths.src.styles + 'style.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(connect.reload());
};