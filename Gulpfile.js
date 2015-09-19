var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
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

gulp.task('html', function() {
  return gulp.src(directories.source.html + '/*')
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('css', function() {
  return gulp.src(directories.source.css + '/*')
    .pipe(gulp.dest(directories.distribution));
});

gulp.task('js', function () {
  return browserify({
    entries: directories.source.js + '/main.js',
    extensions: ['.js'],
    debug: true
  })
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(directories.distribution));
});

gulp.task('test', function () {
    return gulp.src(directories.test + '/**/*.js', { read: false })
        .pipe(mocha({ reporter: 'nyan' }));
});

gulp.task('build', ['js', 'html', 'css']);

gulp.task('watch', function () {
  return gulp.watch([directories.source.base + '/**/*', directories.test + '/**/*'], ['test', 'build']);
});

gulp.task('default', ['test', 'build', 'watch']);
