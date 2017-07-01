var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');

var tsProject = ts.createProject('ts.config.json');
 
gulp.task('default', ['clean-test']);

gulp.task('trasnpile-source', function () {
    return gulp.src('Source/**/*')
                .pipe(tsProject())
                .js
                .pipe(gulp.dest('distribution'));
});

gulp.task('create-source-definition', ['trasnpile-source'], function () {
    return gulp.src('Source/**/*')
                .pipe(tsProject())
                .dts
                .pipe(gulp.dest('distribution'));
});

gulp.task('build', ['create-source-definition']);

gulp.task('trasnpile-test', ['create-source-definition'], function () {
    return gulp.src('Test/**/*')
                .pipe(tsProject({allowJs: true}))
                .js
                .pipe(gulp.dest('test_transpiled'));
});

gulp.task('run-test', ['trasnpile-test'], function () {
    return gulp.src(['test_transpiled/TestStarter.js'])
               .pipe(mocha());
});

gulp.task('clean-test', ['run-test'], function () {
  return gulp.src('test_transpiled', {read: false})
    .pipe(clean());
});

gulp.task('distribute-source', ['clean-test'], function () {

});