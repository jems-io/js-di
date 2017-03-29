var gulp = require('gulp');
var ts = require('gulp-typescript');
var mocha = require('gulp-mocha');

gulp.task('default', ['trasnpileSource', 'trasnpileTest', 'runTest', 'distributeSource']);

gulp.task('trasnpileSource', function () {
    return gulp.src('Source/**/*')
                .pipe(ts({
                    declaration: true
                }))
                .js
                .pipe(gulp.dest('Transpilation/Source'));
});

gulp.task('trasnpileTest', ['trasnpileSource'], function () {
    return gulp.src('Test/**/*')
                .pipe(ts({
                    declaration: true
                }))
                .js
                .pipe(gulp.dest('Transpilation/Test'));
});

gulp.task('runTest', ['trasnpileTest'], function () {
    return gulp.src('Transpilation/Test/**/*')
               .pipe(mocha());
});

gulp.task('distributeSource', ['runTest'], function () {

});