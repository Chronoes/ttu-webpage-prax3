var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var mocha = require('gulp-mocha');

var directories = {
  source: {
    base: './src',
    js: './src/js',
    html: './src/html',
    css: './src/css' },
  test: './test',
  distribution: './remote'
};

gulp.task('lint', function() {
  return gulp.src([
    './*.js',
    directories.source.js + '/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('html', function() {
  return gulp.src(directories.source.html + '/*')
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('sass', function() {
  return gulp.src(directories.source.css + '/*')
    .pipe(sass({includePaths: ['./node_modules/bootstrap/scss']}).on('error', sass.logError))
    .pipe(gulp.dest(directories.distribution + '/'));
});

gulp.task('js', function() {
  return browserify({
    entries: directories.source.js + '/main.js',
    extensions: ['.js'],
    debug: true
  })
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('test', function() {
  return gulp.src(directories.test + '/**/*.js', { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('build', function() {
  return runSequence('lint', 'test', ['js', 'html', 'sass']);
});

gulp.task('watch', function() {
  return gulp.watch([
    './*.js',
    directories.source.base + '/**/*',
    directories.test + '/**/*'
  ], function() {
    return runSequence('build');
  });
});

gulp.task('default', function() {
  return runSequence(['build', 'watch']);
});
