
var gulp = require('gulp'),
    mocha = require('gulp-mocha');

gulp.task('test', function() {
  return gulp
    .src('./test/**/*-spec.js', {read: false})
    .pipe(mocha({reporter: 'spec'}));
});