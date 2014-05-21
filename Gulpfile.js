//var $ = require('gulp-load-plugins')();
var gulp = require('gulp'),
    jade = require('gulp-jade'),
    usemin = require('gulp-usemin'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    print = require('gulp-print'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    settings = require('./.gulpconfig/settings'),
    bump = require('gulp-bump'),
    connect = require('gulp-connect');

var banner = settings.banner;
var paths = settings.paths;

var head = function(){
  return header(banner, { pkg : pkg });
};

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    root: paths.distBase
  });
});

gulp.task("jade", require('./.gulpconfig/jade'));

gulp.task('usemin',  function() {
    gulp.src(paths.src.views+'*.jade')
      .pipe(jade({
        pretty: true,
        basedir: paths.src.views
      }))
    .pipe(gulp.dest(paths.srcBase))
    .pipe(usemin({
      js: [uglify(), rev(), head()]
    }))
    .pipe(gulp.dest(paths.dist.views))
    .pipe(connect.reload());
});

gulp.task('clean', function(){
  gulp.src('./' + paths.dist.views)
    .pipe(clean());
});

gulp.task('copy', function() {
  gulp.src('./src/css/font/*')
    .pipe(gulp.dest(paths.distBase + "/css/font"));
  gulp.src('./src/images/*')
    .pipe(gulp.dest(paths.distBase + "/images"));
  gulp.src('./src/js/plugins/*')
    .pipe(gulp.dest(paths.distBase + "/js/plugins"));
});

gulp.task('bump', function(){
  gulp.src('./package.json')
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});


gulp.task('watch', function() {
  gulp.watch(paths.src.views+"*.jade", ['usemin']);
});


gulp.task('build', ['copy','usemin']);

gulp.task('default', ['build','connect','watch']);
