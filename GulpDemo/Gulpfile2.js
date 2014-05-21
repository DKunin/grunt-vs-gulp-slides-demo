var gulp = require('gulp'),
    jade = require('gulp-jade'),
    clean = require('gulp-clean'),
    connect = require('gulp-connect'),
    settings = require('./.gulpconfig/settings'),
    concat = require('gulp-concat');

var paths = settings.paths;

gulp.task('clean', function(){
  gulp.src('./' + paths.dist.views)
    .pipe(clean());
});

gulp.task('connect',  require('./tasks/connect'));
gulp.task('scripts', require('./tasks/scripts'));
gulp.task('styles', require('./tasks/styles'));
gulp.task('usemin',  require('./tasks/usemin'));

gulp.task('copy', function() {
  gulp.src(paths.srcBase + '/css/font/*')
    .pipe(gulp.dest(paths.distBase + '/css/font'));
  gulp.src(paths.srcBase + '/images/*')
    .pipe(gulp.dest(paths.distBase + '/images'));
});

gulp.task('watch', function() {
  gulp.watch(paths.src.views+'*.jade', ['usemin']);
  gulp.watch(paths.src.styles+'*.styl', ['styles']);
  gulp.watch(paths.src.styles+'*.css', ['usemin']);
  gulp.watch(paths.src.scripts+'*.js', ['scripts']);
  gulp.watch(paths.src.scripts+'/**/*.jsx', ['scripts']);
});

gulp.task('build', ['copy','usemin']);

gulp.task('default', ['connect', 'build','watch']);
