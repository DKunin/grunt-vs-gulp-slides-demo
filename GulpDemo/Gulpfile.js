var gulp = require('gulp'),
    jade = require('gulp-jade'),
    usemin = require('gulp-usemin'),
    stylus = require('gulp-stylus'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    rev = require('gulp-rev'),
    clean = require('gulp-clean'),
    header = require('gulp-header'),
    pkg = require('./package.json'),
    settings = require('./.gulpconfig/settings'),
    bump = require('gulp-bump'),
    connect = require('gulp-connect'),
    reactify = require('gulp-react'),
    concat = require('gulp-concat'),
    nib = require('nib'),
    browserify = require('gulp-browserify'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint');


var banner = settings.banner;
var paths = settings.paths;

var head = function(){
  return header(banner, { pkg : pkg });
};

gulp.task('connect', function() {
  connect.server({
    livereload: true,
    port:9001,
    root: paths.distBase
  });
});

gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src(paths.src.scripts + '/main.js', {read: false})
        .pipe(browserify({
          // insertGlobals : true,
           transform: ['reactify'],
           extensions: ['.jsx'],
           debug : true
        }))
        // .pipe(uglify())
        .pipe(gulp.dest(paths.dist.scripts))
        .pipe(connect.reload())
});

// either a String or an Array
gulp.task('styles', function () {
  gulp.src(paths.src.styles + 'style.styl')
    .pipe(stylus({use: [nib()]}))
    .pipe(gulp.dest(paths.dist.styles))
    .pipe(connect.reload());
});

gulp.task('react', function () {
  gulp.src(paths.src.scripts + '/jsx/*.jsx')
    .pipe(react())
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.src.scripts))
});


gulp.task('usemin',  function() {
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
});
gulp.task('jshint', function () {
  gulp.src(paths.src.scripts + '/main.js')
      .pipe(jshint())
      .pipe(jshint.reporter('jshint-stylish'))
      .pipe(jshint.reporter('gulp-notify-growl'));
});
gulp.task('clean', function(){
  gulp.src('./' + paths.dist.views)
    .pipe(clean());
});

gulp.task('copy', function() {
  gulp.src(paths.srcBase + '/css/font/*')
    .pipe(gulp.dest(paths.distBase + '/css/font'));
  gulp.src(paths.srcBase + '/images/*')
    .pipe(gulp.dest(paths.distBase + '/images'));
  // gulp.src(paths.srcBase + '/js/plugins/*')
    // .pipe(gulp.dest(paths.distBase + '/js/plugins'));
});

gulp.task('bump', function(){
  gulp.src('./package.json')
  .pipe(bump({type:'minor'}))
  .pipe(gulp.dest('./'));
});

gulp.task('reload', function(){
  console.log('should reload');
  gulp.src('./package.json')
  .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(paths.src.views+'*.jade', ['usemin']);
  gulp.watch(paths.src.styles+'*.styl', ['styles']);
  gulp.watch(paths.src.styles+'*.css', ['usemin']);
  gulp.watch(paths.src.scripts+'*.js', ['jshint','scripts']);
  gulp.watch(paths.src.scripts+'/components/*.jsx', ['jshint','scripts']);
  // gulp.watch(paths.distBase + '/*.html', ['reload']);
});

gulp.task('build', ['copy','usemin']);

gulp.task('default', ['connect', 'build','watch']);
