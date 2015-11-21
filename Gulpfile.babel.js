require('babel-core/register')({
  optional: ['es7'],
});
import gulp from 'gulp';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import sass from 'gulp-sass';
import eslint from 'gulp-eslint';
import runSequence from 'run-sequence';
import sasslint from 'gulp-sass-lint';
import babelify from 'babelify';
import sloc from 'gulp-sloc';
import cache from 'gulp-cached';
import remember from 'gulp-remember';
import watchify from 'watchify';

const directories = {
  source: {
    base: './src',
    js: './src/scripts',
    html: './src/html',
    css: './src/style' },
  distribution: './prax3',
};

gulp.task('lint:js', function() {
  return gulp.src([
    './*.js',
    directories.source.js + '/**/*.js'
  ])
    .pipe(remember('scripts'))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:sass', function() {
  return gulp.src(directories.source.css + '/**/*.scss')
    .pipe(remember('style'))
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('html', function() {
  return gulp.src(directories.source.html + '/**/*')
    .pipe(cache('html'))
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('sass', function() {
  return gulp.src(directories.source.css + '/main.scss')
    .pipe(remember('style'))
    .pipe(sass({includePaths: ['./node_modules/bootstrap/scss']}).on('error', sass.logError))
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('js', function() {
  const opts = {
    entries: directories.source.js + '/main.js',
    extensions: ['.js'],
    debug: true,
    transform: babelify.configure({optional: ['es7']}),
  };
  return browserify(opts)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('js:watch', function() {
  const opts = Object.assign({
    entries: directories.source.js + '/main.js',
    extensions: ['.js'],
    debug: true,
    transform: babelify.configure({optional: ['es7']}),
  }, watchify.args);
  return watchify(browserify(opts))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('line-count', function() {
  return gulp.src(directories.source.js + '/**/*.js')
    .pipe(remember('scripts'))
    .pipe(sloc());
});

gulp.task('build', function() {
  return runSequence(['line-count', 'lint'], ['js', 'html', 'sass']);
});

gulp.task('build:watch', function() {
  return runSequence(['line-count', 'lint'], ['js:watch', 'html', 'sass']);
});

gulp.task('watch', function() {
  return gulp.watch([
    './*.js',
    directories.source.base + '/**/*',
  ],
  ['build:watch']);
});

gulp.task('default', ['build:watch', 'watch']);
