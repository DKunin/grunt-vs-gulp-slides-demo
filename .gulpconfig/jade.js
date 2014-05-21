var gulp = require('gulp'),
	jade = require('gulp-jade'),
	settings = require('./settings'),
	paths = settings.paths;

module.exports = function() {
  gulp.src(paths.src.views+"*.jade")
      .pipe(jade({
        pretty: true,
        basedir: paths.src.views
      }))
    .pipe(gulp.dest(paths.srcBase));
}