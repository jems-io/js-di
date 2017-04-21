var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');
var clean = require('gulp-clean');

var tsProject = ts.createProject('tsconfig.json');
 
gulp.task('default', ['trasnpile-source', 'create-source-definition', 'trasnpile-test', 'run-test', 'clean-test', 'distribute-source']);

gulp.task('trasnpile-source', function () {
    return gulp.src('Source/**/*')
                .pipe(ts({
                    declaration: true
                }))
                .js
                .pipe(gulp.dest('distribution'));
});

gulp.task('create-source-definition', ['trasnpile-source'], function () {
    return gulp.src('Source/**/*')
                .pipe(ts({
                    declaration: true
                }))
                .dts
                .pipe(gulp.dest('distribution'));
});

gulp.task('trasnpile-test', ['create-source-definition'], function () {
    return gulp.src('Test/**/*')
                .pipe(ts({
                    declaration: true
                }))
                .js
                .pipe(gulp.dest('test_transpiled'));
});

gulp.task('run-test', ['trasnpile-test'], function () {
    return gulp.src('test_transpiled/TestStarter.js')
               .pipe(mocha());
});

gulp.task('clean-test', ['run-test'], function () {
  return gulp.src(['test_transpiled'], {read: false})
    .pipe(clean());
});

gulp.task('distribute-source', ['clean-test'], function () {

});