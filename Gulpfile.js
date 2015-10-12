var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sass = require('gulp-sass');
var eslint = require('gulp-eslint');
var runSequence = require('run-sequence');
var sasslint = require('gulp-sass-lint');

var directories = {
  source: {
    base: './src',
    js: './src/scripts',
    html: './src/html',
    css: './src/style' },
  distribution: './remote',
};

gulp.task('lint:js', function() {
  return gulp.src([
    './*.js',
    directories.source.js + '/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('lint:sass', function() {
  return gulp.src(directories.source.css + '/**/*.scss')
    .pipe(sasslint())
    .pipe(sasslint.format())
    .pipe(sasslint.failOnError());
});

gulp.task('lint', ['lint:js', 'lint:sass']);

gulp.task('html', function() {
  return gulp.src(directories.source.html + '/**/*')
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('sass', function() {
  return gulp.src(directories.source.css + '/**/*')
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

gulp.task('build', function() {
  return runSequence('lint', ['js', 'html', 'sass']);
});

gulp.task('watch', function() {
  return gulp.watch([
    './*.js',
    directories.source.base + '/**/*',
    directories.test + '/**/*'
  ],
  ['build']);
});

gulp.task('default', ['build', 'watch']);
