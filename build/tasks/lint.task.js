const tslint = require('gulp-tslint');

module.exports = function configureGulp(gulp) {   
  gulp.task('lint', getLintPipe);
  gulp.task('lint-ci', ['test-ci'], getLintPipe);

  function getLintPipe() {
    return gulp.src(['./src/**/*', './test/**/*'])
               .pipe(tslint({
                    formatter: "verbose"
               }))
               .pipe(tslint.report())
  }
}


