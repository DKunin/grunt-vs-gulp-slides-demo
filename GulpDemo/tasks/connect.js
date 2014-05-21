var gulp = require('gulp'),
	connect = require('gulp-connect'),
	settings = require('../.gulpconfig/settings'),
	paths = settings.paths;

module.exports = function() {
  connect.server({
    livereload: true,
    port:9001,
    root: paths.distBase
  });
}